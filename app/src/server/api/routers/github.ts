import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const githubRouter = createTRPCRouter({
  getUserRepos: protectedProcedure.query(async ({ ctx }) => {
    const allRepos = await ctx.githubApi?.repos.listForAuthenticatedUser({
      visibility: "public",
    });

    if (!allRepos || allRepos.data.length === 0) {
      throw new Error("No repos found");
    }

    return allRepos.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      owner: repo.owner.login,
    }));
  }),
  getRepoFiles: protectedProcedure
    .input(
      z.object({
        repoOwner: z.string().min(1),
        repoName: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.githubApi) {
        throw new Error("Unauthorized");
      }

      const repoDetails = await ctx.githubApi.repos.get({
        owner: input.repoOwner,
        repo: input.repoName,
      });
      const projectTree = await ctx.githubApi.git.getTree({
        owner: input.repoOwner,
        repo: input.repoName,
        tree_sha: repoDetails.data.default_branch,
        recursive: "true",
      });

      const filePaths = projectTree.data.tree
        .filter((file) => file.type == "blob" && file.path?.endsWith(".sol"))
        .map((file) => file.path);

      return filePaths;
    }),
});
