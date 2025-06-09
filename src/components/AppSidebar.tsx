"use client";

import * as React from "react";
import {
  IconLayoutDashboard,
  IconSettings,
  IconWallet,
  IconTool,
  IconDatabaseDollar,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <NavSecondary items={data.navSecondary} />
      </SidebarFooter>
    </Sidebar>
  );
}
