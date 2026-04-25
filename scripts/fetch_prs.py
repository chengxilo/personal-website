#!/usr/bin/env python3
"""
Usage:
    py scripts/fetch_contributed_prs.py
    GITHUB_USER=chengxilo GITHUB_TOKEN=ghp_... py scripts/fetch_contributed_prs.py

A token is optional but raises the search API rate limit.
Only uses the Python standard library (no pip install needed).
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

USER = os.environ.get("GITHUB_USER", "chengxilo")
TOKEN = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "app" / "data" / "portfolio.json"

# Repos the portfolio page tracks. Keep this list in sync with page.tsx.
CONTRIBUTED_REPOS = [
    "apache/iggy",
    "cucumber/godog",
    "grpc/grpc-go",
    "xournalpp/xournalpp",
    "wxt-dev/wxt",
    "schollz/progressbar",
]

OWN_REPOS = [
    "chengxilo/countdown",
    "chengxilo/better-cuny",
    "chengxilo/robinhood-note",
    "chengxilo/steam-scrapy",
]

# Repos to skip in the "latest activity" feed (profile readme + this site).
ACTIVITY_EXCLUDED_REPOS = {
    "chengxilo/chengxilo",
    "chengxilo/personal-website",
}

# How many activity items to keep in the JSON payload.
ACTIVITY_LIMIT = 8

# A repo counts as ongoing if its latest activity is within this many days.
PRESENT_WINDOW_DAYS = 90

HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": f"{USER}-portfolio-script",
}
if TOKEN:
    HEADERS["Authorization"] = f"Bearer {TOKEN}"


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise SystemExit(f"GET {url} -> {e.code}: {body}")


def search_prs() -> list[dict]:
    query = urllib.parse.quote(f"author:{USER} type:pr -user:{USER}")
    items: list[dict] = []
    for page in range(1, 11):
        url = f"https://api.github.com/search/issues?q={query}&per_page=100&page={page}"
        data = fetch_json(url)
        page_items = data.get("items", [])
        items.extend(page_items)
        if len(page_items) < 100:
            break
    return items


def group_prs(items: list[dict]) -> dict[str, list[dict]]:
    by_repo: dict[str, list[dict]] = {}
    for it in items:
        repo = it["repository_url"].split("/repos/")[1]
        pr = it.get("pull_request") or {}
        if it.get("state") == "closed":
            state = "merged" if pr.get("merged_at") else "closed"
        else:
            state = "open"
        by_repo.setdefault(repo, []).append({
            "number": it["number"],
            "title": it["title"],
            "url": it["html_url"],
            "state": state,
            "_createdAt": it["created_at"],   # stripped before writing (date range only)
            "_updatedAt": it["updated_at"],   # stripped before writing (sort key)
        })
    # Sort by most recent activity on the PR, newest first.
    for repo in by_repo:
        by_repo[repo].sort(key=lambda p: p["_updatedAt"], reverse=True)
    return by_repo


def parse_iso(s: str) -> datetime:
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def format_date_range(start_iso: str, end_iso: str) -> str:
    start = parse_iso(start_iso)
    end = parse_iso(end_iso)
    now = datetime.now(timezone.utc)
    start_fmt = start.strftime("%b %Y")
    if now - end < timedelta(days=PRESENT_WINDOW_DAYS):
        end_fmt = "Present"
    else:
        end_fmt = end.strftime("%b %Y")
    if start_fmt == end_fmt:
        return start_fmt
    return f"{start_fmt} — {end_fmt}"


def build_contributed(all_prs: dict[str, list[dict]]) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for repo in CONTRIBUTED_REPOS:
        prs = all_prs.get(repo, [])
        if prs:
            created_dates = [p["_createdAt"] for p in prs]
            date_range = format_date_range(min(created_dates), max(created_dates))
        else:
            date_range = ""
        out[repo] = {
            "dateRange": date_range,
            "prs": [
                {"number": p["number"], "title": p["title"], "url": p["url"], "state": p["state"]}
                for p in prs if p["state"] != "closed"
            ],
        }
    return out


_title_cache: dict[tuple[str, int], str] = {}


def lookup_title(repo: str, number: int, kind: str) -> str:
    """Return PR/issue title for repo#number. Caches by (repo, number)."""
    if not repo or not number:
        return ""
    key = (repo, number)
    if key in _title_cache:
        return _title_cache[key]
    path = "pulls" if kind in ("pr", "review") else "issues"
    try:
        data = fetch_json(f"https://api.github.com/repos/{repo}/{path}/{number}")
        title = data.get("title", "") or ""
    except SystemExit:
        title = ""
    _title_cache[key] = title
    return title


def seed_title_cache(all_prs: dict[str, list[dict]]) -> None:
    for repo, prs in all_prs.items():
        for p in prs:
            _title_cache[(repo, p["number"])] = p["title"]


def fetch_events() -> list[dict]:
    items: list[dict] = []
    for page in range(1, 4):  # /events caps at ~300 events / 3 pages of 100
        url = f"https://api.github.com/users/{USER}/events/public?per_page=100&page={page}"
        data = fetch_json(url)
        if not isinstance(data, list):
            break
        items.extend(data)
        if len(data) < 100:
            break
    return items


def normalize_event(ev: dict) -> dict | None:
    repo = ev.get("repo", {}).get("name", "")
    if not repo or repo in ACTIVITY_EXCLUDED_REPOS:
        return None
    payload = ev.get("payload") or {}
    etype = ev.get("type")
    created = ev.get("created_at")

    if etype == "PullRequestEvent":
        pr = payload.get("pull_request") or {}
        action = payload.get("action")
        if action == "closed":
            kind = "pr_merged" if pr.get("merged") else None  # skip closed-not-merged
        elif action in ("opened", "reopened"):
            kind = "pr_opened"
        else:
            kind = None
        if not kind:
            return None
        return {
            "type": kind,
            "repo": repo,
            "number": pr.get("number"),
            "title": pr.get("title", ""),
            "url": pr.get("html_url", ""),
            "createdAt": created,
        }

    if etype == "IssuesEvent":
        issue = payload.get("issue") or {}
        action = payload.get("action")
        if action not in ("opened", "closed", "reopened"):
            return None
        return {
            "type": "issue_closed" if action == "closed" else "issue_opened",
            "repo": repo,
            "number": issue.get("number"),
            "title": issue.get("title", ""),
            "url": issue.get("html_url", ""),
            "createdAt": created,
        }

    if etype == "IssueCommentEvent":
        issue = payload.get("issue") or {}
        comment = payload.get("comment") or {}
        is_pr = "pull_request" in issue
        return {
            "type": "pr_comment" if is_pr else "issue_comment",
            "repo": repo,
            "number": issue.get("number"),
            "title": issue.get("title", ""),
            "url": comment.get("html_url") or issue.get("html_url", ""),
            "createdAt": created,
        }

    if etype == "PullRequestReviewEvent":
        pr = payload.get("pull_request") or {}
        review = payload.get("review") or {}
        number = pr.get("number")
        return {
            "type": "review",
            "repo": repo,
            "number": number,
            "title": pr.get("title") or lookup_title(repo, number, "review"),
            "url": review.get("html_url") or pr.get("html_url", ""),
            "createdAt": created,
        }

    if etype == "PullRequestReviewCommentEvent":
        pr = payload.get("pull_request") or {}
        comment = payload.get("comment") or {}
        number = pr.get("number")
        return {
            "type": "review_comment",
            "repo": repo,
            "number": number,
            "title": pr.get("title") or lookup_title(repo, number, "review"),
            "url": comment.get("html_url") or pr.get("html_url", ""),
            "createdAt": created,
        }

    if etype == "DiscussionEvent":
        disc = payload.get("discussion") or {}
        return {
            "type": "discussion",
            "repo": repo,
            "number": disc.get("number"),
            "title": disc.get("title", ""),
            "url": disc.get("html_url", ""),
            "createdAt": created,
        }

    if etype == "DiscussionCommentEvent":
        disc = payload.get("discussion") or {}
        comment = payload.get("comment") or {}
        return {
            "type": "discussion_comment",
            "repo": repo,
            "number": disc.get("number"),
            "title": disc.get("title", ""),
            "url": comment.get("html_url") or disc.get("html_url", ""),
            "createdAt": created,
        }

    return None


def build_latest_activity() -> list[dict]:
    seen: set[tuple] = set()
    out: list[dict] = []
    for ev in fetch_events():
        norm = normalize_event(ev)
        if not norm:
            continue
        # collapse repeated activity on the same PR/issue (e.g. a review thread)
        key = (norm["type"], norm["repo"], norm.get("number"))
        if key in seen:
            continue
        seen.add(key)
        out.append(norm)
        if len(out) >= ACTIVITY_LIMIT:
            break
    return out


def build_own() -> dict[str, dict]:
    out: dict[str, dict] = {}
    for repo in OWN_REPOS:
        data = fetch_json(f"https://api.github.com/repos/{repo}")
        out[repo] = {
            "dateRange": format_date_range(data["created_at"], data["pushed_at"]),
        }
    return out


def fetch_contribution_calendar() -> dict | None:
    """Fetch the 52-week contribution heatmap via GitHub GraphQL. Requires a token."""
    if not TOKEN:
        print("  contribution calendar: skipped (no GITHUB_TOKEN/GH_TOKEN)")
        return None
    query = """
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
    """
    body = json.dumps({"query": query, "variables": {"login": USER}}).encode("utf-8")
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=body,
        headers={**HEADERS, "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            payload = json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        print(f"  contribution calendar: failed ({e.code}: {body_text[:200]})")
        return None
    cal = (
        payload.get("data", {})
        .get("user", {})
        .get("contributionsCollection", {})
        .get("contributionCalendar")
    )
    if not cal:
        print("  contribution calendar: empty response")
        return None
    return {
        "totalContributions": cal["totalContributions"],
        "weeks": [
            [
                {"date": d["date"], "count": d["contributionCount"]}
                for d in w["contributionDays"]
            ]
            for w in cal["weeks"]
        ],
    }


def main() -> None:
    all_prs = group_prs(search_prs())
    contributed = build_contributed(all_prs)
    own = build_own()
    seed_title_cache(all_prs)
    latest_activity = build_latest_activity()
    contribution_calendar = fetch_contribution_calendar()

    payload = {
        "contributed": contributed,
        "own": own,
        "latestActivity": latest_activity,
        "contributionCalendar": contribution_calendar,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    total_prs = sum(len(v["prs"]) for v in contributed.values())
    print(f"Updated {OUTPUT}")
    print(f"  contributed: {len(contributed)} repos, {total_prs} PRs")
    print(f"  own: {len(own)} repos")
    print(f"  latest activity: {len(latest_activity)} items")
    if contribution_calendar:
        print(f"  contribution calendar: {contribution_calendar['totalContributions']} contributions / {len(contribution_calendar['weeks'])} weeks")

    untracked = [r for r in all_prs if r not in CONTRIBUTED_REPOS]
    if untracked:
        print("\nFound PRs in repos NOT listed in CONTRIBUTED_REPOS:")
        for r in untracked:
            print(f"  {r} ({len(all_prs[r])} PRs) — add to CONTRIBUTED_REPOS and re-run")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
