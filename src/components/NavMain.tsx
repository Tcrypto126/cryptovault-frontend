"use client";

import { type Icon } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface DataProps {
  user: {
    name: string,
    email: string,
    avatar: string | null,
  },
  navMain: {
    title: string,
    url: string,
    icon: Icon,
  }[],
  navSecondary: {
    title: string,
    url: string,
    icon: Icon,
  }[],
}

export function NavMain({
  data,
}: {
  data: DataProps
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
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
                {item.icon && (
                  <item.icon className="!w-5 md:!w-6 !h-5 md:!h-6" />
                )}
                <span className="text-[14px] md:text-[16px] font-[500]">
                  {item.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
