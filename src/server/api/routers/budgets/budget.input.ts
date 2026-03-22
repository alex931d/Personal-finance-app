import { z } from "zod";




export const getBudgetSchema = z.object({
  id: z.string(),
});
export type GetBudgetInput = z.infer<typeof getBudgetSchema>;

export const createBudgetSchema = z.object({
  category: z.enum(["Entertainment", "Bills"]),
  theme: z.enum(["green", "yellow"]),
  limit: z.number().positive().multipleOf(0.01),
  spent: z.number().positive().multipleOf(0.01),
  period: z.enum(["monthly", "weekly", "yearly"]),
});
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;

export const updateBudgetSchema = createBudgetSchema.extend({
  id: z.string(),
});
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;

export const deleteBudgetSchema = z.object({
  id: z.string(),
});
export type DeleteBudgetInput = z.infer<typeof deleteBudgetSchema>;

export const myBudgetsSchema = z.object({
  limit: z.number().int().positive().optional(),
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(10),
});
export type MyBudgetsInput = z.infer<typeof myBudgetsSchema>;
