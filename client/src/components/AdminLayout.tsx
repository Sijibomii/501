import React from "react";
import { Auth } from "@/auth/Auth";
import MainLayout from "./MainLayout";
import { AdminLeftPanel } from "./AdminLeftPanel"
import { LayoutHeader } from "./LayoutHeader";

interface LayoutProps {
    children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  
  return (
    <Auth>
      <MainLayout
        leftPanel={<AdminLeftPanel/>}
        layoutHeader={<LayoutHeader/>}
        >
        {children}
      </MainLayout>
    </Auth>
  );
};