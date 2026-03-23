"use client"
import React, { useRef } from "react";
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowsDownUp, ChartDonut, House, Jar, Receipt } from "@/app/(main)/_components/ui/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
const NAV_LINKS = [
  {
    id: 0,
    name: 'Overview',
    icon: <House />,
    link: '/dashboard',
  },
  {
    id: 1,
    name: 'Transactions',
    icon: <ArrowsDownUp />,
    link: '/transactions',
  },
  {
    id: 2,
    name: 'Budgets',
    icon: <ChartDonut />,
    link: '/budgets',
  },
  {
    id: 3,
    name: 'Pots',
    icon: <Jar />,
    link: '/pots',
  },
  {
    id: 4,
    name: 'Recurring bills',
    icon: <Receipt />,
    link: '/recurring-bills',
  },
] as const
type NavLinkType = (typeof NAV_LINKS)[number]
export default function MobileSidebar() {

  const ref = useRef(null)
  return (
    <motion.div
      ref={ref}
      className="box w-full z-10 fixed bottom-[0] pt-2 bg-primary-gray900 h-16 tablet:hidden"

    >
      <AnimatePresence mode="wait">
        <nav className="w-full h-full px-8 max-[570px]:px-2">
          <ul className="flex w-full h-full justify-between items-stretch gap-1">
            {NAV_LINKS.map((link) => (
              <MobileNavLink key={link.id} link={link} />
            ))}
          </ul>
        </nav>
      </AnimatePresence>
    </motion.div>
  )
}

function MobileNavLink({ link }: { link: NavLinkType }) {
  const pathname = usePathname()
  const isLinkActive = pathname === link.link

  return (
    <Link
      href={link.link}
      className={cn(
        "group flex flex-col items-center justify-center gap-1 px-2 rounded-t-2xl transition-colors w-full h-full max-[570px]:px-0",
        {
          "border-b-4 border-secondary-green bg-primary-beige100": isLinkActive,
          "text-gray-400 hover:text-white": !isLinkActive,
        }
      )}
    >
      <span
        className={cn("text-current w-6 h-6 flex items-center justify-center", {
          "text-secondary-green": isLinkActive,
        })}
      >
        {link.icon}
      </span>

      <motion.p
        transition={{ duration: 0.3 }}
        className={cn(
          "hidden min-[570px]:block text-preset-3 truncate font-bold transition-colors text-sm ",
          {
            "text-gray": isLinkActive,
            "text-gray-400 group-hover:text-white": !isLinkActive,
          }
        )}
      >
        {link.name}
      </motion.p>
    </Link>
  )
}