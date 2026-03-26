import {GITHUB_TOKEN} from "@/app/const";
import {Octokit} from "@octokit/core";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const repo = searchParams.get("repo");
    const owner = searchParams.get("owner");

    if (!repo || !owner) {
        return  Response.json(null, {status: 401, statusText: "repo or owner not provided"});
    }

    // Octokit.js
    // https://github.com/octokit/core.js#readme
    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    })
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
            owner: owner,
            repo: repo,
            headers: {'X-GitHub-Api-Version': '2022-11-28'}
        })
        return Response.json(response.data, {status: 200})
    } catch (e: unknown) {
        const status = (e as {status?: number}).status ?? 500;
        return Response.json(null, {status})
    }
}