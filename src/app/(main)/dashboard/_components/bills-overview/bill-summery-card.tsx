import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "@/app/(main)/_components/ui/icons";
import * as React from "react";
import type { RouterOutputs } from "@/trpc/shared";
import { getNextDueDate,daysUntil } from "../helperFuns";
interface BillProps {
  promises: Promise<[RouterOutputs["bills"]["myBills"]]>;
}


export default function BillTypeSummaryCard({ promises }: BillProps) {
  const result = React.use(promises);
  const bills = Array.isArray(result) ? result[0] : result;

  let paidSum = 0;
  let dueSum = 0;
  let upcomingSum = 0;

  for (const bill of bills) {
    const amount = parseFloat(bill.amount);
    if (bill.isPaid) {
      paidSum += amount;
    } else {
      const nextDue = getNextDueDate(bill.dueDay);
      const days = daysUntil(nextDue);
      if (days <= 7) {
        dueSum += amount;
      } else {
        upcomingSum += amount;
      }
    }
  }

  const statuses = [
    { key: 'Paid', label: 'Paid', color: '#277C78', value: paidSum },
    { key: 'Due', label: 'Due', color: '#3E82F0', value: dueSum },
    { key: 'Upcoming', label: 'Upcoming', color: '#F2CD60', value: upcomingSum },
  ];

  return (
    <Card className="h-1/2 flex flex-col">
      <CardHeader className="flex flex-row justify-between items-top">
        <span className="font-bold text-slate-950 w-fit">Bills</span>
        <div className="flex gap-3.5 items-center w-fit">
          <Link href="/bills" className="flex gap-3.5 items-center justify-center">
            <span className="text-gray-500 w-fit">See Details</span>
            <ArrowRight />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex flex-col gap-3 flex-grow">
        {statuses.map(({ key, label, color, value }) => (
          <Card
            key={key}
            className="bg-primary-beige100 p-3 flex justify-between items-center border-l-4"
            style={{ borderLeftColor: color }}
          >
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-lg font-bold text-gray-900">
              ${value.toFixed(2)}
            </p>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}