import { z } from "zod";


export const listPotsSchema = z.object({

  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(10),
});
export type ListPotsInput = z.infer<typeof listPotsSchema>;

export const getPotSchema = z.object({
  id: z.string(),
});
export type GetPotInput = z.infer<typeof getPotSchema>;

export const createPotSchema = z.object({
  name: z.string().min(3).max(255),
  theme: z.enum(["green", "yellow"]),
  amount: z.number().positive().multipleOf(0.01),
  total: z.number().positive().multipleOf(0.01),
});
export type CreatePotInput = z.infer<typeof createPotSchema>;

export const updatePotSchema = createPotSchema.extend({
  id: z.string(),
});
export type UpdatePotInput = z.infer<typeof updatePotSchema>;

export const deletePotSchema = z.object({
  id: z.string(),
});
export type DeletePotInput = z.infer<typeof deletePotSchema>;

export const myPotsSchema = z.object({
  limit: z.number().int().positive().optional(),
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(10),
});
export type MyPotsInput = z.infer<typeof myPotsSchema>;
