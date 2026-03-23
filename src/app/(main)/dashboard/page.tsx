import { env } from "@/env";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import * as React from "react";
import { PostsSkeleton } from "./_components/posts-skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


import BudgetSummaryCard from "@/app/(main)/dashboard/_components/budgets-overview/Budget-summery-card";
import TransactionSummaryCard from "@/app/(main)/dashboard/_components/transaction-overview/transaction-summery-card";
import PotSummaryCard, {
} from "@/app/(main)/dashboard/_components/pots-overview/pot-summery-card";
import BillTypeSummaryCard, {
} from "@/app/(main)/dashboard/_components/bills-overview/bill-summery-card";
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Manage dashboard here",
};

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}
export default async function DashboardPage({ searchParams }: Props) {
  const { user } = await validateRequest();
  if (!user) redirect(Paths.Login);



  /**
   * Passing multiple promises to `Promise.all` to fetch data in parallel to prevent waterfall requests.
   * Passing promises to the `Posts` component to make them hot promises (they can run without being awaited) to prevent waterfall requests.
   * @see https://www.youtube.com/shorts/A7GGjutZxrs
   * @see https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
   */
  const Potpromise = Promise.all([
    api.pot.myPots.query({ limit: 5 }),

  ]);
  const Budgetpromise = Promise.all([
    api.budget.myBudgets.query({ limit: 5 }),

  ]);
  const Transactionpromise = Promise.all([
    api.transaction.myTransactions.query({ limit: 5 }),

  ]);
  const Billpromise = Promise.all([
    api.bills.myBills.query({ limit: 5 }),

  ]);






  return (
    <div className="h-full">
      <div className="mb-6 grid gap-6">
        <h1 className="text-2xl font-bold text-primary-gray900">Overview</h1>
        <div className="grid grid-cols-1 min-[640px]:grid-cols-3 gap-5 min-[640px]:max-h-36">


        <Card className="rounded-2xl bg-primary-gray900 w-full">
          <CardHeader>
            <span className="text-white">
              Current Balance
            </span>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
             ${user.balance}
            </span>
          </CardContent>
        </Card>
          <Card className="rounded-2xl w-full">
            <CardHeader>
            <span>
              Income
            </span>
            </CardHeader>
            <CardContent>
            <span className="text-3xl font-bold">
              $4.836.00
            </span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl w-full">
            <CardHeader>
            <span>
              Expenses
            </span>
            </CardHeader>
            <CardContent>
            <span className="text-3xl font-bold">
              $4.836.00
            </span>
            </CardContent>
          </Card>
        </div>
        <section className="grid grid-cols-1 tablet:grid-cols-5 h-full gap-6 flex-grow">
          <section className="col-span-1 tablet:col-span-3  flex flex-col gap-6 flex-grow">
            <PotSummaryCard promises={Potpromise} />

              <TransactionSummaryCard promises={Transactionpromise} />


          </section>
          <section className="col-span-1 tablet:col-span-2 gap-6  flex flex-col ">
       
            <BudgetSummaryCard promises={Budgetpromise}/>
            <BillTypeSummaryCard promises={Billpromise}/>
          </section>
        </section>
      </div>
    </div>
  );
}
