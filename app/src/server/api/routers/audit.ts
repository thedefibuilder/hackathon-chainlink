import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const auditRouter = createTRPCRouter({
  createRequest: protectedProcedure
    .input(
      z.object({
        repoOwner: z.string().min(1),
        repoName: z.string().min(1),
        filesInScope: z.array(z.string()).min(1),
        title: z.string().min(1),
        tags: z.array(z.string()).min(1),
        categories: z.array(z.string()).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.auditRequest.create({
        data: {
          repoOwner: input.repoOwner,
          repoName: input.repoName,
          filesInScope: input.filesInScope,
          title: input.title,
          tags: input.tags,
          categories: input.categories,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getRequest: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.auditRequest.findUnique({
        where: { id: input.id },
      });
    }),

  getResponse: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.auditResponse.findUnique({
        where: { auditRequestId: input.id },
      });
    }),
});
