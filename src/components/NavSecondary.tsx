"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconLogout } from "@tabler/icons-react";
import { NavUser } from "@/components/NavUser";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/assets/avatars/avatar-sample.jpg",
  },
};

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

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pathname === item.url}
                onClick={() => {
                  router.push(item.url);
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
        <SidebarMenuButton className="mt-1" onClick={() => {}}>
          <IconLogout className="!w-5 md:!w-6 !h-5 md:!h-6" />
          <span className="text-[14px] md:text-[16px] font-[500]">Logout</span>
        </SidebarMenuButton>
        <div className="mt-1 p-4 block lg:hidden">
          <NavUser user={data.user} />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
