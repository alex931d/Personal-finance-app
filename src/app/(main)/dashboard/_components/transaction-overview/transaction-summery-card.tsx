import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "@/app/(main)/_components/ui/icons";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import type { RouterOutputs } from "@/trpc/shared";

interface TransactionProps {
  promises: Promise<[RouterOutputs["transaction"]["myTransactions"]]>;
}

export default function TransactionSummaryCard({
                                                 promises,
                                          }: TransactionProps) {
  const result = React.use(promises);
  const transactions = Array.isArray(result) ? result[0] : result;
  console.log(transactions);
  return (
    <>
    <Card className="flex flex-col flex-grow h-[519px]">
      <CardHeader className="flex flex-row justify-between items-top">
              <span className="font-bold text-slate-950 w-fit ">
                 Transactions
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
      <CardContent className="h-full overflow-y-auto">
        <ul className="flex flex-col justify-between h-full">
          {transactions.map((transaction,index) => {

            const formattedAmount = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              signDisplay: 'auto',
            }).format(Number(transaction.amount));


            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(transaction.createdAt);
            const isLast = index === transactions.length - 1;
            const borderClass = isLast ? "" : "border-b-2 border-gray-200";
            return (
              <li
                key={transaction.otherUser.name}
                className={cn("flex justify-between py-5 py h-full", borderClass)}              >
                <div className="flex items-center gap-5">
                  <Avatar>
                    <AvatarImage src={transaction.otherUser.avatar ?? undefined} />
                    <AvatarFallback>{transaction.otherUser.name}</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-primary-gray900">
            {transaction.otherUser.name}
          </span>
                </div>

                <div className="flex flex-col justify-between items-end">
          <span
            className={cn(
              " font-bold",
              Number(transaction.amount) >= 0
                ? "text-green-600" // positive amount
                : "text-gray-600"   // negative amount
            )}
          >
            {formattedAmount}
          </span>
                  <span className="text-sm text-primary-gray500">{formattedDate}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
    </>
  )}