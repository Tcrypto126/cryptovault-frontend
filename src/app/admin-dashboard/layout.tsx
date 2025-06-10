"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DataHeader from "@/components/DataHeader";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//       icon: IconLayoutDashboard,
//     },
//     {
//       title: "Wallet",
//       url: "/dashboard/wallet",
//       icon: IconWallet,
//     },
//     {
//       title: "Transactions",
//       url: "/dashboard/transactions",
//       icon: IconDatabaseDollar,
//     },
//   ],
//   navMenuAdmin: [
//     {
//       title: "Dashboard",
//       url: "/admin-dashboard",
//       icon: IconLayoutDashboard,
//     },
//     {
//       title: "Users",
//       url: "/admin-dashboard/wallet",
//       icon: IconWallet,
//     },
//     {
//       title: "Transactions",
//       url: "/admin-dashboard/transactions",
//       icon: IconWallet,
//     },
//     {
//       title: "Withdrawal Requests",
//       url: "/admin-dashboard/withdrawal-requests",
//       icon: IconDatabaseDollar,
//     },
//     {
//       title: "Deposit Incentives",
//       url: "/admin-dashboard/deposit-incentives",
//       icon: IconDatabaseDollar,
//     },
//     {
//       title: "KYC Verification",
//       url: "/admin-dashboard/kyc-verification",
//       icon: IconDatabaseDollar,
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Support",
//       url: "/admin-dashboard/support",
//       icon: IconTool,
//     },
//     {
//       title: "Settings",
//       url: "/admin-dashboard/settings",
//       icon: IconSettings,
//     },
//   ],
// };

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full relative">
        <div className="flex items-center gap-2 w-full h-[56px] md:h-[81px] px-4 md:px-6 bg-dashboard">
          <SidebarTrigger className="block lg:hidden" />
          <DataHeader />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
