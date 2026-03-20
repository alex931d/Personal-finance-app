import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "@/app/(main)/_components/ui/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
export interface BillStatus {
  name: 'Paid' | 'Total' | 'Due';
  color: string;
}
export interface BillType {
  amount: number;
  date: Date;
  enum: BillStatus[];
}


interface BillTypeSummaryProps {
  BillData: BillType[];
}


export default function BillTypeSummaryCard({
                                              BillData,
                                               }: BillTypeSummaryProps) {
  const totals = {
    Paid: 0,
    Total: 0,
    Due: 0,
  };
  const statusColorMap: Partial<Record<'Paid' | 'Total' | 'Due', string>> = {};
  BillData.forEach((bill) => {
    bill.enum.forEach((statusObj) => {
      const { name, color } = statusObj;
      // Add to total
      totals[name] += bill.amount;
      // Record color if not already set (or override if you want last one)
      if (!statusColorMap[name]) {
        statusColorMap[name] = color;
      }
    });
  });


  const statuses: Array<'Paid' | 'Total' | 'Due'> = ['Paid', 'Total', 'Due'];
  return (
    <>
    <Card className="h-1/2  flex flex-col">
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
      <CardContent className="pt-2 flex flex-col gap-3 flex-grow">
        {statuses.map((status) => (
          <Card
            key={status}
            className="bg-primary-beige100 p-3 flex justify-between items-center border-l-4"
            style={{ borderLeftColor: statusColorMap[status] ?? '#ccc' }} // fallback color
          >
            <p className="text-sm text-gray-600">{status}</p>
            <p className="text-lg font-bold text-gray-900">
              ${totals[status].toFixed(2)}
            </p>
          </Card>
        ))}
      </CardContent>
    </Card>
    </>
  )}