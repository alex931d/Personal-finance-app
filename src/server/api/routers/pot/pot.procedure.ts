import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./pot.input";
import * as services from "./pot.service";

export const potRouter = createTRPCRouter({
  list: protectedProcedure
    .input(inputs.listPotsSchema)
    .query(({ ctx, input }) => services.listPots(ctx, input)),

  get: protectedProcedure
    .input(inputs.getPotSchema)
    .query(({ ctx, input }) => services.getPot(ctx, input)),

  create: protectedProcedure
    .input(inputs.createPotSchema)
    .mutation(({ ctx, input }) => services.createPot(ctx, input)),

  update: protectedProcedure
    .input(inputs.updatePotSchema)
    .mutation(({ ctx, input }) => services.updatePot(ctx, input)),

  delete: protectedProcedure
    .input(inputs.deletePotSchema)
    .mutation(async ({ ctx, input }) => services.deletePot(ctx, input)),

  myPots: protectedProcedure
    .input(inputs.myPotsSchema)
    .query(({ ctx, input }) => services.myPots(ctx, input)),
});
