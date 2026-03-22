import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  boolean,
  index,
  numeric,
  text,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { DATABASE_PREFIX as prefix } from "@/lib/constants";

export const pgTable = pgTableCreator((name) => `${prefix}_${name}`);

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    balance: numeric("balance", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => ({
    userIdx: index("session_user_idx").on(t.userId),
  }),
);

export const emailVerificationCodes = pgTable(
  "email_verification_codes",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 21 }).unique().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => ({
    userIdx: index("verification_code_user_idx").on(t.userId),
    emailIdx: index("verification_code_email_idx").on(t.email),
  }),
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: varchar("id", { length: 40 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => ({
    userIdx: index("password_token_user_idx").on(t.userId),
  }),
);


export const budgets = pgTable("budgets", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 }).notNull(),
  category: varchar("category", { enum: ["Entertainment", "Bills"] }).notNull(),
  theme: varchar("theme", { enum: ["green", "yellow"] }).notNull(),
  limit: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  spent: numeric("spent", { precision: 10, scale: 2 }).notNull(),
  period: varchar("period", { enum: ["monthly", "weekly", "yearly"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Budgets = typeof budgets.$inferSelect;
export type NewBudgets = typeof budgets.$inferInsert;
export const pots = pgTable(
  "pots",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    theme: varchar("theme", { enum: ["green", "yellow"] }).notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
  },
  (t) => ({
    nameIdx: index("pots_name_idx").on(t.name),
    themeIdx: index("pots_theme_idx").on(t.theme),
    createdAtIdx: index("pots_created_at_idx").on(t.createdAt),
  })
);
export type Pots = typeof pots.$inferSelect;
export type NewPots = typeof pots.$inferInsert;
export const bills = pgTable("bills", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  dueDay: integer("due_day").notNull(), // 1–31
  category: varchar("category", { length: 100 }),
  isPaid: boolean("is_paid").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Bills = typeof bills.$inferSelect;
export type NewBills = typeof bills.$inferInsert;
export const transactions = pgTable(
  "transactions",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    fromUserId: varchar("from_user_id", { length: 21 }).notNull(),
    toUserId: varchar("to_user_id", { length: 21 }).notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    description: varchar("description", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    isRecurring: boolean("is_recurring").default(false).notNull(),
  },
  (t) => ({
    fromUserIdx: index("transactions_from_user_idx").on(t.fromUserId),
    toUserIdx: index("transactions_to_user_idx").on(t.toUserId),
    createdIdx: index("transactions_created_idx").on(t.createdAt),
  })
);
export type Transactions = typeof transactions.$inferSelect;
export type NewTransactions = typeof transactions.$inferInsert;
export const potsRelations = relations(pots, ({ one }) => ({
  user: one(users, {
    fields: [pots.userId],
    references: [users.id],
  }),
}));
export const billsRelations = relations(bills, ({ one }) => ({
  user: one(users, {
    fields: [bills.userId],
    references: [users.id],
  }),
}));
export const budgetsRelations = relations(budgets, ({ one }) => ({
  user: one(users, {
    fields: [budgets.userId],
    references: [users.id],
  }),
}));
export const transactionsRelations = relations(transactions, ({ one }) => ({
  fromUser: one(users, {
    fields: [transactions.fromUserId],
    references: [users.id],
  }),
  toUser: one(users, {
    fields: [transactions.toUserId],
    references: [users.id],
  }),
}));



