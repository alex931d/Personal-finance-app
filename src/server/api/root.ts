import { potRouter } from "@/server/api/routers/pot/pot.procedure";
import { stripeRouter } from "./routers/stripe/stripe.procedure";
import { userRouter } from "./routers/user/user.procedure";
import { createTRPCRouter } from "./trpc";
import { budgetRouter } from "@/server/api/routers/budgets/budget.procedure";

export const appRouter = createTRPCRouter({
  user: userRouter,
  pot: potRouter,
  budget: budgetRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
