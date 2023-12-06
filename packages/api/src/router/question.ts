import { z } from "zod";

import { desc, eq } from "@acme/db";
import { questions } from "@acme/db/schema/question";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.questions.findMany({ orderBy: desc(questions.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.questions.findFirst({
        where: eq(questions.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        createdByUserId: z.number(),
        text: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      console.log("input", input);
      return ctx.db.insert(questions).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(questions).where(eq(questions.id, input));
  }),
});
