"use client"
import type { ReactNode } from "react";
import iconLarge from "../../../public/assets/images/logo-large.svg"
import Image from "next/image";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-primary-beige100 flex h-screen flex-col w-full">

      <header className="hidden  bg-primary-gray900 overflow-hidden rounded-b-2xl w-full min-h-16  max-tablet:flex items-center justify-center">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image src={iconLarge} alt="logo" width={100} height={100} />
      </header>
      <div className="flex justify-between h-full w-full">
      <div className="flex flex-1 justify-center items-center max-tablet:flex-row">
        <div className="flex flex-row items-center max-w-[1180px] justify-between  w-full h-full max-h-[780px] max-tablet:flex-col p-3">

          <div className="h-full min-w-[35%] max-w-[350px] rounded accent-slate-800 max-tablet:hidden">
            <section className="flex p-8 flex-col max-w-[400px] justify-between rounded-2xl h-full w-full bg-[url('/assets/images/illustration-authentication.svg')] bg-cover bg-center">

              <div>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                <Image src={iconLarge} alt="logo" width={100} height={100} />
              </div>

              <div className="w-full flex flex-col gap-3">
                <h2 className="text-2xl text-white font-bold">
                  Keep track of your money and save for your future
                </h2>
                <p className="text-white text-xs">
                  Personal finance app puts you in control of your spending.
                  Track transactions, set budgets, and add to savings pots easily.
                </p>
              </div>

            </section>
          </div>

          <div className="h-full min-w-[65%] max-tablet:min-w-[85%] max-w-screen-mobile:min-w-none w-[95%]">
            <div className="grid h-full place-items-center p-4">
              {children}
            </div>
          </div>

        </div>
      </div>
      </div>

    </div>
  );
};

export default AuthLayout;
