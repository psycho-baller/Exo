import { authRouter } from "./router/auth";
import { friendRouter } from "./router/friend";
import { questionRouter } from "./router/question";
import { tagRouter } from "./router/tag";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  friend: friendRouter,
  question: questionRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
