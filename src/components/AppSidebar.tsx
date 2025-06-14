"use client";

import * as React from "react";
import {
  IconLayoutDashboard,
  IconSettings,
  IconWallet,
  IconTool,
  IconDatabaseDollar,
  IconUsers,
  IconTransferIn,
  IconTransferOut,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user } = useUserStore();

  const dataUser = {
    user: {
      name: user?.full_name || "",
      email: user?.email || "",
      avatar: user?.avatar || "/assets/avatars/avatar-default.png",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "Wallet",
        url: "/dashboard/wallet",
        icon: IconWallet,
      },
      {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: IconDatabaseDollar,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/dashboard/support",
        icon: IconTool,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: IconSettings,
      },
    ],
  };

  const dataAdmin = {
    user: {
      name: user?.full_name || "",
      email: user?.email || "",
      avatar: user?.avatar || "/assets/avatars/avatar-default.png",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: IconUsers,
      },
      {
        title: "Transactions",
        url: "/admin-dashboard/transactions",
        icon: IconDatabaseDollar,
      },
      {
        title: "Withdrawal Requests",
        url: "/admin-dashboard/withdrawal-requests",
        icon: IconTransferOut,
      },
      {
        title: "Deposit Incentives",
        url: "/admin-dashboard/deposit-incentives",
        icon: IconTransferIn,
      },
      {
        title: "KYC Verification",
        url: "/admin-dashboard/kyc-verification",
        icon: IconRosetteDiscountCheck,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/admin-dashboard/support",
        icon: IconTool,
      },
      {
        title: "Settings",
        url: "/admin-dashboard/settings",
        icon: IconSettings,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props} className="z-50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-none py-6 focus:!bg-none"
            >
              <Link href="/">
                <Image
                  src="/assets/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                />
                <span className="text-base font-semibold">CryptoWallet</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain data={user?.role === "ADMIN" ? dataAdmin : dataUser} />
      </SidebarContent>
      <SidebarFooter>
        <Separator className="hidden lg:block" />
        <NavSecondary data={user?.role === "ADMIN" ? dataAdmin : dataUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
