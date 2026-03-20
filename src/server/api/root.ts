import { potRouter } from "@/server/api/routers/pot/pot.procedure";
import { stripeRouter } from "./routers/stripe/stripe.procedure";
import { userRouter } from "./routers/user/user.procedure";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  pot: potRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
