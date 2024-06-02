import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const githubRouter = createTRPCRouter({
  getUserRepos: protectedProcedure.query(async ({ ctx }) => {
    const allRepos = await ctx.githubApi?.repos.listForAuthenticatedUser({
      visibility: "public",
    });

    if (!allRepos || allRepos.data.length === 0 || !ctx.githubApi) {
      throw new Error("No repos found");
    }

    const allAuditableRepos = await Promise.all(
      allRepos.data.filter(async (repo) => {
        const languages = await ctx.githubApi?.repos.listLanguages({
          owner: repo.owner?.login,
          repo: repo.name,
        });

        return !!languages?.data.Solidity;
      }),
    );

    return allAuditableRepos.map((repo) => ({
      name: repo.name,
      owner: repo.owner.login,
    }));
  }),
  getRepoTree: protectedProcedure
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

      return projectTree.data.tree.map((file) => ({
        isFolder: file.type === "tree",
        isAuditable: !!file.path?.endsWith(".sol"),
        path: file.path,
      }));
    }),

  getFileContent: protectedProcedure
    .input(
      z.object({
        repoOwner: z.string().min(1),
        repoName: z.string().min(1),
        path: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.githubApi) {
        throw new Error("Unauthorized");
      }

      const fileContent = await ctx.githubApi.repos.getContent({
        owner: input.repoOwner,
        repo: input.repoName,
        path: input.path,
      });

      return fileContent.data;
    }),
});
