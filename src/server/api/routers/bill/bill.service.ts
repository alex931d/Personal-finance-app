
import type { ProtectedTRPCContext } from "../../trpc";
import type {

  GetBillInput,
  MyBillsInput,

} from "./bill.input";
import { eq, and } from "drizzle-orm";

export const getBill = async (ctx: ProtectedTRPCContext, { id }: GetBillInput) => {
  return ctx.db.query.bills.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: { user: { columns: { email: true } } },
  });
};
export const myBills = async (ctx: ProtectedTRPCContext, input: MyBillsInput) => {
  const config: Parameters<typeof ctx.db.query.bills.findMany>[0] = {
    where: (table, { eq, and }) => {
      const conditions = [eq(table.userId, ctx.user.id)];
      if (input.isPaid !== undefined) {
        conditions.push(eq(table.isPaid, input.isPaid));
      }
      if (input.category !== undefined) {
        conditions.push(eq(table.category, input.category));
      }
      return and(...conditions);
    },
    orderBy: (table, { desc }) => desc(table.createdAt),
    columns: {
      id: true,
      name: true,
      amount: true,
      dueDay: true,
      category: true,
      isPaid: true,
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

  return ctx.db.query.bills.findMany(config);
};