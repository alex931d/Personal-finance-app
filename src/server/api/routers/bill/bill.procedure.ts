import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./bill.input";
import * as services from "./bill.service";

export const billRouter = createTRPCRouter({
  get: protectedProcedure
    .input(inputs.getBillSchema)
    .query(({ ctx, input }) => services.getBill(ctx, input)),

  myBills: protectedProcedure
    .input(inputs.myBillsSchema)
    .query(({ ctx, input }) => services.myBills(ctx, input)),
});