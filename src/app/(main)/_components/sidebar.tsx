import { UserDropdown } from "@/app/(main)/_components/user-dropdown";
import { RocketIcon } from "@/components/icons";
import { validateRequest } from "@/lib/auth/validate-request";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/assets/images/logo-large.svg"

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = async ({isOpen}: SidebarProps) => {
  const { user } = await validateRequest();

  return (
    <nav>
      <section className="flex flex-com">
        <div className="flex flex-col items-center">
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <Image src={logo} alt="logo" height={100} width={100} />
          </div>
          <ul className="flex flex-col justify-between">
            <li className="bg-white w-[95%]">
              <div className="flex gap-3"></div>
            </li>
          </ul>
        </div>
        <div>

        </div>


      </section>
    </nav>
  );
};
