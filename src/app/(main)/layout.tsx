import { type ReactNode } from "react";
import SideBar from "./_components/sidebar";
import MobileSidebar from "./_components/mobilesidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-full min-h-screen bg-primary-beige100 tablet:flex">
      <SideBar />
        <MobileSidebar />
      {children}
    </div>
    </>
  );
};

export default MainLayout;
