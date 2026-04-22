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
OUTPUT = ROOT / "app" / "data" / "contributedPrs.json"

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
        merged = it.get("state") == "closed" and bool(pr.get("merged_at"))
        by_repo.setdefault(repo, []).append({
            "number": it["number"],
            "title": it["title"],
            "url": it["html_url"],
            "merged": merged,
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
                {"number": p["number"], "title": p["title"], "url": p["url"], "merged": p["merged"]}
                for p in prs
            ],
        }
    return out


def build_own() -> dict[str, dict]:
    out: dict[str, dict] = {}
    for repo in OWN_REPOS:
        data = fetch_json(f"https://api.github.com/repos/{repo}")
        out[repo] = {
            "dateRange": format_date_range(data["created_at"], data["pushed_at"]),
        }
    return out


def main() -> None:
    all_prs = group_prs(search_prs())
    contributed = build_contributed(all_prs)
    own = build_own()

    payload = {"contributed": contributed, "own": own}

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    total_prs = sum(len(v["prs"]) for v in contributed.values())
    print(f"Updated {OUTPUT}")
    print(f"  contributed: {len(contributed)} repos, {total_prs} PRs")
    print(f"  own: {len(own)} repos")

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
