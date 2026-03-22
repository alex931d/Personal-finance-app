
import { db } from "@/server/db";
import * as schema from "./schema";
import { Scrypt } from "lucia";
import { seed, reset } from "drizzle-seed";


async function main() {
  console.log("Seeding database...");

  const hashedPassword = await new Scrypt().hash("12345678");
  await reset(db, schema);


  await seed(db, schema, { seed: 12345 }).refine((f) => ({
    // ------------------------------------------------------------------
    // Users
    // ------------------------------------------------------------------
    users: {
      count: 5,
      columns: {
        id: f.valuesFromArray({
          values: ["user_1", "user_2", "user_3", "user_4", "user_5"],
          isUnique: true,
        }),
        email: f.email(),
        emailVerified: f.boolean(),
        hashedPassword: f.default({ defaultValue: hashedPassword }),
        avatar: f.valuesFromArray({
          values: [
            "https://example.com/avatar1.png",
            "https://example.com/avatar2.png",
          ],
        }),
        balance: f.number({ minValue: 100, maxValue: 2000, precision: 100 }),
        createdAt: f.date({ minDate: "2024-01-01", maxDate: new Date() }),
        updatedAt: f.date({ minDate: "2024-01-01", maxDate: new Date() }),
      },
    },

    // ------------------------------------------------------------------
    // Budgets
    // ------------------------------------------------------------------
    budgets: {
      count: 8,
      columns: {

        userId: f.valuesFromArray({
          values: ["user_1", "user_2", "user_3", "user_4", "user_5"],
        }),
        category: f.valuesFromArray({
          values: ["Entertainment", "Bills"],
        }),
        theme: f.valuesFromArray({
          values: ["green", "yellow"],
        }),
        limit: f.number({ minValue: 100, maxValue: 2000, precision: 100 }),
        spent: f.number({ minValue: 100, maxValue: 2000, precision: 100 }),
        period: f.valuesFromArray({
          values: ["monthly", "weekly", "yearly"],
        }),

        createdAt: f.date({ minDate: "2024-01-01", maxDate: new Date() }),
      },
    },

    // ------------------------------------------------------------------
    // Pots
    // ------------------------------------------------------------------
    pots: {
      count: 10,
      columns: {

        name: f.companyName(), // using company name as pot name
        theme: f.valuesFromArray({
          values: ["green", "yellow"],
        }),
        amount: f.number({ minValue: 0, maxValue: 5000, precision: 100 }),
        total: f.number({ minValue: 1000, maxValue: 10000, precision: 100 }),
        userId: f.valuesFromArray({
          values: ["user_1", "user_2", "user_3", "user_4", "user_5"],
        }),
        createdAt: f.date({ minDate: "2024-01-01", maxDate: new Date() }),
        updatedAt: f.date({ minDate: "2024-01-01", maxDate: new Date() }),
      },
    },

    // ------------------------------------------------------------------
    // Bills
    // ------------------------------------------------------------------
    bills: {
      count: 12,
      columns: {
        userId: f.valuesFromArray({
          values: ["user_1", "user_2", "user_3", "user_4", "user_5"],
        }),
        name: f.valuesFromArray({
          values: [
            "Rent",
            "Netflix",
            "Electricity",
            "Water",
            "Internet",
            "Gym",
          ],
        }),
        amount: f.number({ minValue: 10, maxValue: 2000, precision: 100 }),
        dueDay: f.int({ minValue: 1, maxValue: 31 }),
        category: f.valuesFromArray({
          values: ["Housing", "Utilities", "Entertainment", "Health"],
        }),
        isPaid: f.boolean(),
        createdAt: f.date({ minDate: "2024-01-01", maxDate: new Date() }),
      },
    },

    // ------------------------------------------------------------------
    // Transactions – references two users (from and to)
    // ------------------------------------------------------------------
    transactions: {
      count: 25,
      columns: {
        fromUserId: f.valuesFromArray({
          values: ["user_1", "user_2", "user_3", "user_4", "user_5"],
        }),
        toUserId: f.valuesFromArray({
          values: ["user_1", "user_2", "user_3", "user_4", "user_5"],
        }),
        amount: f.number({ minValue: 1, maxValue: 500, precision: 100 }),
        description: f.loremIpsum(),
        createdAt: f.date({ minDate: "2024-01-01", maxDate: new Date() }),
        isRecurring: f.boolean(),
      },
    },
  }));

  console.log("Seeding completed.");
}

main().catch(console.error);