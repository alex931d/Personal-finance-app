import { generateId, User } from "lucia";
import type { ProtectedTRPCContext } from "../../trpc";
import type {
  CreateTransactionInput,
  DeleteTransactionInput,
  GetTransactionInput,
  MyTransactionsInput,
  UpdateTransactionInput,
} from "./transaction.input";
import { transactions, type NewTransactions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

interface TransactionWithUsers {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: string;
  description: string | null;
  createdAt: Date;
  isRecurring: boolean;
  fromUser: User;
  toUser: User;
}

export const getTransaction = async (ctx: ProtectedTRPCContext, { id }: GetTransactionInput) => {
  return ctx.db.query.transactions.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: {
      fromUser: { columns: { email: true, id: true } },
      toUser: { columns: { email: true, id: true } },
    },
  });
};

export const createTransaction = async (ctx: ProtectedTRPCContext, input: CreateTransactionInput) => {
  const id = generateId(21);

  const values: NewTransactions = {
    id,
    fromUserId: input.fromUserId,
    toUserId: input.toUserId,
    amount: String(input.amount),
    description: input.description,
    isRecurring: input.isRecurring ?? false,
  };

  await ctx.db.insert(transactions).values(values);
  return { id };
};

export const updateTransaction = async (ctx: ProtectedTRPCContext, input: UpdateTransactionInput) => {
  const updateData: Partial<{
    fromUserId: string;
    toUserId: string;
    amount: string;
    description: string | null;
    isRecurring: boolean;
  }> = {};

  if (input.fromUserId !== undefined) updateData.fromUserId = input.fromUserId;
  if (input.toUserId !== undefined) updateData.toUserId = input.toUserId;
  if (input.amount !== undefined) updateData.amount = String(input.amount);
  if (input.description !== undefined) updateData.description = input.description;
  if (input.isRecurring !== undefined) updateData.isRecurring = input.isRecurring;

  if (Object.keys(updateData).length === 0) {
    return ctx.db.query.transactions.findFirst({ where: eq(transactions.id, input.id) });
  }

  const [item] = await ctx.db
    .update(transactions)
    .set(updateData)
    .where(eq(transactions.id, input.id))
    .returning();

  return item;
};

export const deleteTransaction = async (ctx: ProtectedTRPCContext, { id }: DeleteTransactionInput) => {
  const [item] = await ctx.db.delete(transactions).where(eq(transactions.id, id)).returning();
  return item;
};

export const myTransactions = async (ctx: ProtectedTRPCContext, input: MyTransactionsInput) => {
  const config: Parameters<typeof ctx.db.query.transactions.findMany>[0] = {
    where: (table, { eq, or }) => or(eq(table.fromUserId, ctx.user.id), eq(table.toUserId, ctx.user.id)),
    orderBy: (table, { desc }) => desc(table.createdAt),
    columns: {
      id: true,
      fromUserId: true,
      toUserId: true,
      amount: true,
      description: true,
      createdAt: true,
      isRecurring: true,
    },
    with: {
      fromUser: { columns: { email: true, id: true, name: true, avatar: true } },
      toUser: { columns: { email: true, id: true, name: true, avatar: true } },
    },
  };

  if (input.limit) {
    config.limit = input.limit;
  }
  else if (input.page && input.perPage) {
    config.limit = input.perPage;
    config.offset = (input.page - 1) * input.perPage;
  }

  const transactions = (await ctx.db.query.transactions.findMany(config)) as TransactionWithUsers[];


  return transactions.map((tx) => {
    const isSender = tx.fromUserId === ctx.user.id;

    const otherUser = (isSender ? tx.toUser : tx.fromUser);
    return {
      ...tx,
      direction: isSender ? "outgoing" : "incoming",
      otherUser,
    };
  });
};