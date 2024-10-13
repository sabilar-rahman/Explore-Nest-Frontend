import { ReactNode } from "react";
import SideBarLayout from "./admin/_components/SideBarLayout";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-dark min-h-screen flex">
      <SideBarLayout />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
