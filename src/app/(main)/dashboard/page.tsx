import { env } from "@/env";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { myPostsSchema } from "@/server/api/routers/post/post.input";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import * as React from "react";
import { PostsSkeleton } from "./_components/posts-skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, House, Jar } from "../../(main)/_components/ui/icons";
import BudgetPieChart, { type BudgetSpending} from "@/app/(main)/dashboard/_components/budgets-overview/pie-chart/pie-chart";

import BudgetSummaryCard from "@/app/(main)/dashboard/_components/budgets-overview/Budget-summery-card";
import TransactionSummaryCard, { type TransactionType } from "@/app/(main)/dashboard/_components/transaction-overview/transaction-summery-card";
import PotSummaryCard, {
  type PotType,
} from "@/app/(main)/dashboard/_components/pots-overview/pot-summery-card";
import BillTypeSummaryCard, {
  type BillType,
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
  const { page, perPage } = myPostsSchema.parse(searchParams);

  const { user } = await validateRequest();
  if (!user) redirect(Paths.Login);

  /**
   * Passing multiple promises to `Promise.all` to fetch data in parallel to prevent waterfall requests.
   * Passing promises to the `Posts` component to make them hot promises (they can run without being awaited) to prevent waterfall requests.
   * @see https://www.youtube.com/shorts/A7GGjutZxrs
   * @see https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
   */
  const promises = Promise.all([
    api.post.myPosts.query({ page, perPage }),
  ]);

  const billTypeData: BillType[] = [
    {
      amount: 1250.75,
      date: new Date('2025-01-15'),
      enum: [
        { name: 'Total', color: '#3b82f6' } // blue
      ]
    },
    {
      amount: 890.50,
      date: new Date('2025-02-10'),
      enum: [
        { name: 'Due', color: '#ef4444' }   // red
      ]
    },
    {
      amount: 2300.00,
      date: new Date('2025-03-05'),
      enum: [
        { name: 'Paid', color: '#10b981' }  // green
      ]
    }
  ];


  const Budgets: BudgetSpending[] = [
    {
      category: "Expensives",
      maximum: 120,
      spent: 45,
      theme: "#277C78",
    },
    {
      category: "Expensives",
      maximum: 300,
      spent: 178,
      theme: "#82C9D7",
    },
    {
      category: "Expensives",
      maximum: 80,
      spent: 63,
      theme: "#826CB0",
    },
    {
      category: "Expensives",
      maximum: 500,
      spent: 210,
      theme: "#CAB361",
    },
  ];
  const Transactions: TransactionType[] = [
    {
      img: "/assets/images/avatars/daniel-carter.jpg",
      name: "Coffee Shop",
      amount: -12.50,
      date: new Date(2024, 2, 15), // March 15, 2024
    },
    {
      img: "/assets/images/avatars/daniel-carter.jpg",
      name: "Salary Deposit",
      amount: 3500.00,
      date: new Date(2024, 2, 1),
    },
    {
      img: "/assets/images/avatars/daniel-carter.jpg",
      name: "Online Subscription",
      amount: -9.99,
      date: new Date(2024, 2, 10),
    },
    {
      img: "/assets/images/avatars/daniel-carter.jpg",
      name: "Grocery Store",
      amount: -85.30,
      date: new Date(2024, 2, 12),
    },
    {
      img: "/assets/images/avatars/daniel-carter.jpg",
      name: "Freelance Payment",
      amount: 450.00,
      date: new Date(2024, 1, 28), // February 28, 2024
    },

  ];

const pots: PotType[] = [
  {
    id: 0,
    name: 'pot1',
    theme: "#277C78",
    amount: 2,
    total: 3,
    userId: 2,
    createdAt: "2",
    updatedAt: "2",
  },
  {
    id: 1,
    name: 'pot2',
    theme: "#82C9D7",
    amount: 2,
    total: 3,
    userId: 2,
    createdAt: "2",
    updatedAt: "2",
  },
  {
    id: 3,
    name: 'pot3',
    theme: "#826CB0",
    amount: 2,
    total: 3,
    userId: 2,
    createdAt: "2",
    updatedAt: "2",
  },
  {
    id: 4,
    name: 'pot4',
    theme: "#CAB361",
    amount: 2,
    total: 3,
    userId: 2,
    createdAt: "2",
    updatedAt: "2",
  },
]
  return (
    <div className="h-full">
      <div className="mb-6 grid gap-6 grid-rows-[auto_1fr] h-full">
        <h1 className="text-2xl font-bold text-primary-gray900">Overview</h1>
        <div className="grid grid-cols-3 gap-5">


        <Card className="rounded-2xl bg-primary-gray900 w-full">
          <CardHeader>
            <span className="text-white">
              Current Balance
            </span>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              $4.836.00
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
        <section className="grid grid-cols-5 h-full gap-6  flex-grow">
          <section className=" col-span-3 flex flex-col gap-6 flex-grow">
            <PotSummaryCard PotData={pots} />

              <TransactionSummaryCard TransactionData={Transactions} />


          </section>
          <section className="col-span-2 gap-6  flex flex-col ">
       
            <BudgetSummaryCard BudgetData={Budgets}/>
            <BillTypeSummaryCard BillData={billTypeData}/>
          </section>
        </section>
      </div>
      <React.Suspense fallback={<PostsSkeleton />}>

      </React.Suspense>
    </div>
  );
}
