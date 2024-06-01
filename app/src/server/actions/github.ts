import { Octokit } from "octokit";

export async function isRepoAuditableAction(
  octokit: Octokit,
  owner: string,
  repoName: string,
) {
  "use server";

  try {
    const languages = await octokit.rest.repos.listLanguages({
      owner: owner,
      repo: repoName,
    });

    return !!languages.data.Solidity;
  } catch (error: unknown) {
    console.error("ERROR FETCHING LANGUAGES", error);
  }
}
