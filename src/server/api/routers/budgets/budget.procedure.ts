import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./budget.input";
import * as services from "./budget.service";

export const budgetRouter = createTRPCRouter({
  get: protectedProcedure
    .input(inputs.getBudgetSchema)
    .query(({ ctx, input }) => services.getBudget(ctx, input)),

  create: protectedProcedure
    .input(inputs.createBudgetSchema)
    .mutation(({ ctx, input }) => services.createBudget(ctx, input)),

  update: protectedProcedure
    .input(inputs.updateBudgetSchema)
    .mutation(({ ctx, input }) => services.updateBudget(ctx, input)),

  delete: protectedProcedure
    .input(inputs.deleteBudgetSchema)
    .mutation(async ({ ctx, input }) => services.deleteBudget(ctx, input)),

  myBudgets: protectedProcedure
    .input(inputs.myBudgetsSchema)
    .query(({ ctx, input }) => services.myBudgets(ctx, input)),
});