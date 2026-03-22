"use client";

import { Label, Pie, PieChart } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { useRef, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import type { RouterOutputs } from "@/trpc/shared";


interface BudgetPieChartProps {
  budgetSpendingData: RouterOutputs["budget"]["myBudgets"];
  className?: string;
}



export default function BudgetPieChart({
                                         budgetSpendingData,
                                         className,
                                       }: BudgetPieChartProps) {

  const chartConfig = budgetSpendingData.reduce<ChartConfig>(
    (acc, { category, theme }) => {
      acc[category] = { label: category, color: theme };
      return acc;
    },
    {}
  ) satisfies ChartConfig;
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  useResizeObserver(containerRef, (entry) => {
    const { width, height } = entry.contentRect;
    setDimensions({ width, height });
  });
  const radius = Math.min(dimensions.width, dimensions.height) * 0.4;
  const innerRadius = radius * 0.6;
  const chartData = budgetSpendingData.map(({ category, spent, theme }) => ({
    category,
    spent,
    fill: theme,
  }));
  const innerPieData = chartData.map((item) => ({
    ...item,
    fill: "rgba(238, 238, 238, 0.5)",
  }));
  // Calculate total spent vs. total budget
  const [totalSpent, totalBudget] = budgetSpendingData.reduce(
    ([spentSum, maxSum], { spent, limit }) => [
      spentSum + Number(spent),
      maxSum + Number(limit),
    ],
    [0, 0]
  );

  return (

    <ChartContainer ref={containerRef} config={chartConfig} className={cn("aspect-square h-64 max-[1125px]:h-54", className)}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="spent"
          nameKey="category"
          innerRadius={innerRadius}
          outerRadius={radius}
        />
        <Pie
          dataKey="spent"
          nameKey="category"
          data={innerPieData}
          outerRadius={radius * 0.7} // 70% of main outer
          innerRadius={innerRadius}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                const { cx, cy } = viewBox;
                return (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={cx}
                      y={cy}
                      className="fill-foreground text-2xl md:text-3xl font-bold"
                    >
                      ${totalSpent.toLocaleString()}
                    </tspan>
                    <tspan
                      x={cx}
                      y={(cy ?? 0) + 24}
                      className="fill-muted-foreground"
                    >
                      of ${totalBudget.toLocaleString()} limit
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>


      </PieChart>

    </ChartContainer>
  );
}