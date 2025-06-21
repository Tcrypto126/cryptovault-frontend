"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { IconDotsVertical, type Icon } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconLogout, IconDashboard } from "@tabler/icons-react";
import { useAuth } from "@/providers/authProvider";

interface DataProps {
  user: {
    name: string;
    email: string;
    avatar: string | null;
  };
  navMain: {
    title: string;
    url: string;
    icon: Icon;
  }[];
  navSecondary: {
    title: string;
    url: string;
    icon: Icon;
  }[];
}

export function NavSecondary({
  data,
}: {
  data: DataProps;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2 hidden lg:flex ">
          {data.navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pathname === item.url}
                onClick={() => {
                  router.push(item.url);
                  // Close the sidebar only on mobile
                  if (window.innerWidth < 1024) {
                    // 1024px is typically lg breakpoint
                    const sidebarTrigger = document.querySelector(
                      '[data-sidebar="trigger"]'
                    ) as HTMLButtonElement;
                    sidebarTrigger?.click();
                  }
                }}
              >
                <item.icon className="!w-5 md:!w-6 !h-5 md:!h-6" />
                <span className="text-[14px] md:text-[16px] font-[500]">
                  {item.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenuButton
          className="items-center gap-2 mt-2 hidden lg:flex"
          onClick={() => {
            logout();
          }}
        >
          <IconLogout className="!w-5 md:!w-6 !h-5 md:!h-6" />
          <span className="text-[14px] md:text-[16px] font-[500]">Logout</span>
        </SidebarMenuButton>

        <div className="mt-1 p-4 block lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-[#4b4770d3] rounded-md p-2">
                <Avatar className="h-10 w-10 rounded-full cursor-pointer border-[1px] border-[#beb6b6]">
                  <AvatarImage src={data.user.avatar || ''} alt="avatar" />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{data.user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {data.user.email}
                  </span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-46 rounded-lg"
              // side={window.innerWidth < 640 ? "top" : "right"}
              side="top"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                {data.navSecondary.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    onClick={() => {
                      router.push(item.url);
                      const sidebarTrigger = document.querySelector(
                        '[data-sidebar="trigger"]'
                      ) as HTMLButtonElement;
                      sidebarTrigger?.click();
                    }}
                  >
                    <item.icon />
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                }}
              >
                <IconLogout />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
