import { z } from "zod";

export const getTransactionSchema = z.object({
  id: z.string(),
});
export type GetTransactionInput = z.infer<typeof getTransactionSchema>;

export const createTransactionSchema = z.object({
  fromUserId: z.string(),
  toUserId: z.string(),
  amount: z.number().positive().multipleOf(0.01),
  description: z.string().max(255).optional(),
  isRecurring: z.boolean().default(false),
});
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = createTransactionSchema.extend({
  id: z.string(),
});
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;


export const deleteTransactionSchema = z.object({
  id: z.string(),
});
export type DeleteTransactionInput = z.infer<typeof deleteTransactionSchema>;

// List transactions with pagination
export const myTransactionsSchema = z.object({
  limit: z.number().int().positive().optional(),
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(10),
});
export type MyTransactionsInput = z.infer<typeof myTransactionsSchema>;