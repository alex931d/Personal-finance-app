import { potRouter } from "@/server/api/routers/pot/pot.procedure";
import { stripeRouter } from "./routers/stripe/stripe.procedure";
import { userRouter } from "./routers/user/user.procedure";
import { createTRPCRouter } from "./trpc";
import { budgetRouter } from "@/server/api/routers/budgets/budget.procedure";
import { transactionRouter } from "@/server/api/routers/transaction/transaction.procedure";
import { billRouter } from "@/server/api/routers/bill/bill.procedure";

export const appRouter = createTRPCRouter({
  user: userRouter,
  pot: potRouter,
  budget: budgetRouter,
  bills: billRouter,
  transaction: transactionRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
