import { z } from "zod";

import { desc, eq } from "@acme/db";
import { friends } from "@acme/db/schema/user";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const friendRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.friends.findMany({ orderBy: desc(friends.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.friends.findFirst({
        where: eq(friends.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        createdByUserId: z.number(),
        friendUserId: z.number().optional(),
        name: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(friends).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(friends).where(eq(friends.id, input));
  }),
});
