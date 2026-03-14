import BudgetPieChart, { BudgetSpending } from "@/app/(main)/dashboard/_components/budgets-overview/pie-chart/pie-chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "@/app/(main)/_components/ui/icons";
import { cn } from "@/lib/utils";
import * as React from "react";

interface BudgetSummaryProps {
  BudgetData: BudgetSpending[];
  show?: boolean;
}


export default function BudgetSummaryCard({
                                            BudgetData,
                                            show,
                                          }: BudgetSummaryProps) {

  return (
    <Card className="w-full">
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
      <CardContent className="flex gap-3 items-stretch">
        <div>
          <BudgetPieChart
            className={cn({
              "flex-1": true,
              "lg:h-48 xl:h-72": show,
            })}
            budgetSpendingData={BudgetData}
          />
        </div>
      </CardContent>
    </Card>
  );
}