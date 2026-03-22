import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Jar } from "@/app/(main)/_components/ui/icons";
import * as React from "react";
import { type RouterOutputs } from "@/trpc/shared";
interface PotsProps {
  promises: Promise<[RouterOutputs["pot"]["myPots"]]>;
}

export default function PotSummaryCard({ promises }: PotsProps) {
  const result = React.use(promises);
  const pots = Array.isArray(result) ? result[0] : result;
  const totalSaved = pots.reduce((sum, pot) => sum + parseFloat(pot.amount), 0);
  const formattedTotal = totalSaved.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <Card className={"h-[218px]"}>
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
        <CardContent className="flex gap-3 self-start">
          <Card className="bg-primary-beige100 w-1/2 self-stretch">
            <CardContent className="pt-2 flex gap-4 h-full items-center">
              <Jar fill="none" width={40} height={40} />
              <div className="flex flex-col justify-between">
                <span className="text-gray-500 w-fit">Total Saved</span>
                <span className="text-3xl font-bold text-slate-950">${formattedTotal}</span>
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
    </>
  )}