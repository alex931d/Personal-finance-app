import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./transaction.input";
import * as services from "./transaction.service";

export const transactionRouter = createTRPCRouter({
  get: protectedProcedure
    .input(inputs.getTransactionSchema)
    .query(({ ctx, input }) => services.getTransaction(ctx, input)),

  create: protectedProcedure
    .input(inputs.createTransactionSchema)
    .mutation(({ ctx, input }) => services.createTransaction(ctx, input)),

  update: protectedProcedure
    .input(inputs.updateTransactionSchema)
    .mutation(({ ctx, input }) => services.updateTransaction(ctx, input)),

  delete: protectedProcedure
    .input(inputs.deleteTransactionSchema)
    .mutation(({ ctx, input }) => services.deleteTransaction(ctx, input)),

  myTransactions: protectedProcedure
    .input(inputs.myTransactionsSchema)
    .query(({ ctx, input }) => services.myTransactions(ctx, input)),
});
