import { generateId } from "lucia";
import type { ProtectedTRPCContext } from "../../trpc";
import type {
  CreatePotInput,
  DeletePotInput,
  GetPotInput,
  ListPotsInput,
  MyPotsInput,
  UpdatePotInput,
} from "./pot.input";
import { type NewPots, pots } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const listPots = async (ctx: ProtectedTRPCContext, input: ListPotsInput) => {
  return ctx.db.query.pots.findMany({
    where: (table, { eq }) => eq(table.userId, ctx.user.id), // filter by user
    offset: (input.page - 1) * input.perPage,
    limit: input.perPage,
    orderBy: (table, { desc }) => desc(table.createdAt),
    columns: {
      id: true,
      name: true,
      theme: true,
      amount: true,
      total: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getPot = async (ctx: ProtectedTRPCContext, { id }: { id: string }) => {
  return ctx.db.query.pots.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: { user: { columns: { email: true } } },
  });
};

export const createPot = async (ctx: ProtectedTRPCContext, input: CreatePotInput) => {
  const id = generateId(21);

  const values: NewPots = {
    id,
    userId: ctx.user.id,
    name: input.name,
    theme: input.theme,
    amount: String(input.amount),
    total: String(input.total),
  };

  await ctx.db.insert(pots).values(values);
  return { id };
};

export const updatePot = async (ctx: ProtectedTRPCContext, input: UpdatePotInput) => {
  const updateData: Partial<{
    name: string;
    theme: "green" | "yellow";
    amount: string;
    total: string;
  }> = {};
  if (input.name !== undefined) updateData.name = input.name;
  if (input.theme !== undefined) updateData.theme = input.theme;
  if (input.amount !== undefined) updateData.amount = String(input.amount);
  if (input.total !== undefined) updateData.total = String(input.total);


  if (Object.keys(updateData).length === 0) {
    return ctx.db.query.pots.findFirst({ where: eq(pots.id, input.id) });
  }

  const [item] = await ctx.db
    .update(pots)
    .set(updateData)
    .where(eq(pots.id, input.id))
    .returning();

  return item;
};

export const deletePot = async (ctx: ProtectedTRPCContext, { id }: DeletePotInput) => {
  const [item] = await ctx.db.delete(pots).where(eq(pots.id, id)).returning();
  return item;
};
export const myPots = async (ctx: ProtectedTRPCContext, input: MyPotsInput) => {
  const config: Parameters<typeof ctx.db.query.pots.findMany>[0] = {
    where: (table, { eq }) => eq(table.userId, ctx.user.id),
    orderBy: (table, { desc }) => desc(table.createdAt),
    columns: {
      id: true,
      name: true,
      theme: true,
      amount: true,
      total: true,
      createdAt: true,
      updatedAt: true,
    },
  };
  // If a limit is provided
  if (input.limit) {
    config.limit = input.limit;
  }
  // if pagination is provided
  if (input.page && input.perPage) {
    config.limit = input.perPage;
    config.offset = (input.page - 1) * input.perPage;
  }
  return ctx.db.query.pots.findMany(config);
};