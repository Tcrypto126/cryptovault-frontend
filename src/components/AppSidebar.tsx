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
  IconRosetteDiscountCheck
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
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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
  navMenuAdmin: [
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
      url: "/dashboard/support",
      icon: IconTool,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
  navSecondaryAdmin: [
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props} className="z-50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-none py-6 focus:!bg-none"
              //   onClick={() => {
              //     router.push("/");
              //   }}
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
        <NavMain
          items={
            pathname.includes("/admin-dashboard")
              ? data.navMenuAdmin
              : data.navMain
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <NavSecondary
          items={
            pathname.includes("/admin-dashboard")
              ? data.navSecondaryAdmin
              : data.navSecondary
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}
