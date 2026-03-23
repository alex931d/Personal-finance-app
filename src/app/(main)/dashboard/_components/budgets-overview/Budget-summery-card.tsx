"use client";
import BudgetPieChart from "@/app/(main)/dashboard/_components/budgets-overview/pie-chart/pie-chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "@/app/(main)/_components/ui/icons";
import { cn } from "@/lib/utils";
import * as React from "react";
import type { RouterOutputs } from "@/trpc/shared";
interface BudgetProps {
  promises: Promise<[RouterOutputs["budget"]["myBudgets"]]>;
  show?: boolean;
}



export default function BudgetSummaryCard({
                                            promises,
                                            show,
                                          }: BudgetProps) {
  const result = React.use(promises);
  const budgets = Array.isArray(result) ? result[0] : result;
 
  return (
    <Card className="w-full h-1/2 max-mobile:h-full tablet:h-full">
      <CardHeader className="flex flex-row justify-between items-top">
              <span className="font-bold text-slate-950 w-fit ">
                 Budgets
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
      <CardContent className="flex flex-col gap-3 items-center justify-center max-[1125px]:flex-col mobile:flex-row">
        <BudgetPieChart
          className={cn({
            "flex-1": true,
            "lg:h-48 xl:h-72": show,
          })}
          budgetSpendingData={budgets}
        />


        <div className="w-fit max-mobile:max-w-full max-mobile:overflow-x-auto">
          <div className="flex flex-col max-mobile:flex-row flex-nowrap gap-3 max-tablet:flex-col">
            {budgets.map((Budget,index) => (
              <div key={index} className="flex gap-4 items-center flex-shrink-0">
                <div
                  className="rounded-2xl w-1 self-stretch"
                  style={{ backgroundColor: Budget.theme }}
                />
                <div className="flex flex-col justify-between p-1">
                  <span className="text-gray-500 text-nowrap">{Budget.category}</span>
                  <span className="font-bold text-primary-gray900">
              ${Budget.spent}
            </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}