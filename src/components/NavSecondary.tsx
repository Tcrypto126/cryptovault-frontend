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
import verifyToken from "@/lib/verifyToken";
import instance from "@/lib/axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const [role, setRole] = useState<"ADMIN" | "USER">("USER");

  const [data, setData] = useState({
    user: {
      name: "",
      email: "",
      avatar: "/assets/avatars/user-sample.png",
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const token: string | null = window.localStorage.getItem("token");
        const { isTokenValid, role } = await verifyToken(token || "");
        if (isTokenValid) {
          setRole(role as "ADMIN" | "USER");

          const res = await instance.get("/api/user/profile");
          if (res.status == 200) {
            setData({
              user: {
                name: res.data.user.name,
                email: res.data.user.email,
                avatar: `${SERVER_URL}/assets/${res.data.user.avatar}`,
              },
            });
          }
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const LogOut = () => {
    logout();
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2 hidden lg:flex ">
          {items.map((item) => (
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
            LogOut();
          }}
        >
          <IconLogout className="!w-5 md:!w-6 !h-5 md:!h-6" />
          <span className="text-[14px] md:text-[16px] font-[500]">Logout</span>
        </SidebarMenuButton>

        <div className="mt-1 p-4 block lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-[#272431ad] rounded-md p-2">
                <Avatar className="h-10 w-10 rounded-full cursor-pointer">
                  <AvatarImage src={data.user.avatar} alt="avatar" />
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
                {items.map((item) => (
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
