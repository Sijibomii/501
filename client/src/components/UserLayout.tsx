import React from "react";
import { Auth } from "@/auth/Auth";
import MainLayout from "./MainLayout";
import { LayoutHeader } from "./LayoutHeader";
import { UserLeftPanel }from "./UserLeftPanel";
interface LayoutProps {
    children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  
  return (
    <Auth>
      <MainLayout
        leftPanel={<UserLeftPanel/>}
        layoutHeader={<LayoutHeader/>}
        >
        {children}
      </MainLayout>
    </Auth>
  );
};