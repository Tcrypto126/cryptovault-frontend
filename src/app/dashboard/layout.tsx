"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DataHeader from "@/components/DataHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full relative pt-[56px] lg:pt-[81px]">
        <div className="flex items-center gap-2 w-full h-[56px] lg:h-[81px] px-4 lg:px-6 lg:pl-[324px] bg-dashboard fixed top-0 left-0 right-0 z-40">
          <SidebarTrigger className="block lg:hidden" />
          <DataHeader />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
