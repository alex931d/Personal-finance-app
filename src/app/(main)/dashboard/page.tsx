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
import BudgetPieChart, { BudgetSpending} from "@/app/(main)/dashboard/_components/budgets-overview/pie-chart/pie-chart";
import { cn } from "@/lib/utils";
import BudgetSummaryCard from "@/app/(main)/dashboard/_components/budgets-overview/Budget-summery-card";
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

  const Budgets: BudgetSpending[] = [
    {
      category: "pot1",
      maximum: 120,
      spent: 45,
      theme: "#277C78",
    },
    {
      category: "pot2",
      maximum: 300,
      spent: 178,
      theme: "#82C9D7",
    },
    {
      category: "pot3",
      maximum: 80,
      spent: 63,
      theme: "#826CB0",
    },
    {
      category: "pot4",
      maximum: 500,
      spent: 210,
      theme: "#CAB361",
    },
  ];

const pots = [
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
    <div>
      <div className="mb-6 grid gap-6">
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
        <section className="grid grid-cols-5 gap-6">
          <section className="grid col-span-3">
          <Card>
            <CardHeader className="flex flex-row justify-between items-top">
              <span className="font-bold text-slate-950 w-fit ">
                 Pots
              </span>
             <div className="flex gap-3.5 items-center w-fit ">
               <Link href="/pots" className="flex gap-3.5 items-center justify-center">
                <span className="text-gray-500 w-fit ">
                  See Details
                </span>
                 <ArrowRight />
               </Link>
             </div>
            </CardHeader>
            <CardContent className="flex gap-3 items-stretch">
              <Card className="bg-primary-beige100 w-1/2 self-stretch">
                <CardContent className="pt-2 flex gap-4 h-full items-center">
                  <Jar fill="none" width={40} height={40} />
                  <div className="flex flex-col justify-between">
                    <span className="text-gray-500 w-fit">Total Saved</span>
                    <span className="text-3xl font-bold text-slate-950">$</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-3 flex-1">
                {pots.map((pot) => (
                  <div key={pot.name} className="flex gap-4 items-center">
                    <div
                      className="rounded-2xl w-1 self-stretch"
                      style={{ backgroundColor: pot.theme }}
                    />
                    <div className="flex flex-col justify-between p-1">
                      <span className="text-gray-500 w-fit">{pot.name}</span>
                      <span className="font-bold text-primary-gray900 w-fit">
                     ${pot.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </section>
          <section className="flex gap-4 w-full">
       
            <BudgetSummaryCard BudgetData={Budgets}/>
          </section>
        </section>
      </div>
      <React.Suspense fallback={<PostsSkeleton />}>

      </React.Suspense>
    </div>
  );
}
