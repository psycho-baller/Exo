import { z } from "zod";

import { desc, eq } from "@acme/db";
import { questionFriends } from "@acme/db/schema/question";
import { friends } from "@acme/db/schema/user";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const questionFriendRouter = createTRPCRouter({
  // all: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.questions.findMany({ orderBy: desc(questions.id) });
  // }),

  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.query.questions.findFirst({
  //       where: eq(questions.id, input.id),
  //     });
  //   }),

  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       createdByUserId: z.number(),
  //       text: z.string().min(1),
  //     }),
  //   )
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(questions).values(input);
  //   }),

  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(questions).where(eq(questions.id, input));
  // }),
  create: protectedProcedure
    .input(
      z.object({
        questionId: z.number(),
        friendId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(questionFriends).values(input);
    }),

  byId: protectedProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.db.query.questionFriends.findMany({
        where: eq(questionFriends.questionId, input),
      });
    }),
  getFriendByQuestionId: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const questionFriend = await ctx.db.query.questionFriends.findFirst({
        where: eq(questionFriends.questionId, input.questionId),
      });

      if (!questionFriend) {
        throw new Error('No friend found for this question');
      }

      const friend = await ctx.db.query.friends.findFirst({
        where: eq(friends.id, questionFriend.friendId ?? 0),
      });

      if (!friend) {
        throw new Error('Friend not found');
      }

      return friend;
    }),
});
