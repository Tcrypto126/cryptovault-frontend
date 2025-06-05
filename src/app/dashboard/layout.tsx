import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DataHeader from "@/components/data-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full border border-amber-400">
        <div className="flex items-center gap-2 h-[56px] md:h-[81px] px-4 md:px-6 bg-[#1f1f2e] border-amber-400 border">
          <SidebarTrigger className="block md:hidden" />
          <DataHeader />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
