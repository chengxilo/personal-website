import {GITHUB_TOKEN, GITHUB_USERNAME} from "@/app/const";
import {Octokit} from "@octokit/core";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const repo = searchParams.get("repo");

    if (!repo) {
        return  Response.json(null, {status: 401});
    }

    // Octokit.js
    // https://github.com/octokit/core.js#readme
    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    })
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: GITHUB_USERNAME,
        repo: repo,
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
    })

    return Response.json(response.data, {status: 200})
}