import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const githubRouter = createTRPCRouter({
  getUserRepos: protectedProcedure.query(async ({ ctx }) => {
    return ctx.githubApi.repos.listForAuthenticatedUser({
      visibility: "public",
    });
  }),
  getRepoFiles: protectedProcedure
    .input(
      z.object({
        owner: z.string().min(1),
        repoName: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const repoDetails = await ctx.githubApi.repos.get({
        owner: input.owner,
        repo: input.repoName,
      });
      const projectTree = await ctx.githubApi.git.getTree({
        owner: input.owner,
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
