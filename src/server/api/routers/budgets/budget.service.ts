import { generateId } from "lucia";
import type { ProtectedTRPCContext } from "../../trpc";
import type {
  CreateBudgetInput,
  DeleteBudgetInput,
  GetBudgetInput,
  MyBudgetsInput,
  UpdateBudgetInput,
} from "./budget.input";
import { budgets, type NewBudgets } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getBudget = async (ctx: ProtectedTRPCContext, { id }: GetBudgetInput) => {
  return ctx.db.query.budgets.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: { user: { columns: { email: true } } },
  });
};

export const createBudget = async (ctx: ProtectedTRPCContext, input: CreateBudgetInput) => {
  const id = generateId(21);

  const values: NewBudgets = {
    id,
    userId: ctx.user.id,
    category: input.category,
    theme: input.theme,
    limit: String(input.limit),
    spent: String(input.spent),
    period: input.period,
  };

  await ctx.db.insert(budgets).values(values);
  return { id };
};

export const updateBudget = async (ctx: ProtectedTRPCContext, input: UpdateBudgetInput) => {
  const updateData: Partial<{
    category: "Entertainment" | "Bills";
    theme: "green" | "yellow";
    limit: string;
    period: "monthly" | "weekly" | "yearly";
  }> = {};

  if (input.category !== undefined) updateData.category = input.category;
  if (input.theme !== undefined) updateData.theme = input.theme;
  if (input.limit !== undefined) updateData.limit = String(input.limit);
  if (input.period !== undefined) updateData.period = input.period;

  if (Object.keys(updateData).length === 0) {
    return ctx.db.query.budgets.findFirst({ where: eq(budgets.id, input.id) });
  }

  const [item] = await ctx.db
    .update(budgets)
    .set(updateData)
    .where(eq(budgets.id, input.id))
    .returning();

  return item;
};

export const deleteBudget = async (ctx: ProtectedTRPCContext, { id }: DeleteBudgetInput) => {
  const [item] = await ctx.db.delete(budgets).where(eq(budgets.id, id)).returning();
  return item;
};

export const myBudgets = async (ctx: ProtectedTRPCContext, input: MyBudgetsInput) => {
  const config: Parameters<typeof ctx.db.query.budgets.findMany>[0] = {
    where: (table, { eq }) => eq(table.userId, ctx.user.id),
    orderBy: (table, { desc }) => desc(table.createdAt),
    columns: {
      id: true,
      category: true,
      theme: true,
      limit: true,
      spent: true,
      period: true,
      createdAt: true,
    },
  };

  if (input.limit) {
    config.limit = input.limit;
  }
  if (input.page && input.perPage) {
    config.limit = input.perPage;
    config.offset = (input.page - 1) * input.perPage;
  }

  return ctx.db.query.budgets.findMany(config);
};

