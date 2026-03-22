import { z } from "zod";

export const getBillSchema = z.object({
  id: z.string(),
});
export type GetBillInput = z.infer<typeof getBillSchema>;

export const myBillsSchema = z.object({
  limit: z.number().int().positive().optional(),
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(10),
  isPaid: z.boolean().optional(),
  category: z.string().max(100).optional(),
});
export type MyBillsInput = z.infer<typeof myBillsSchema>;