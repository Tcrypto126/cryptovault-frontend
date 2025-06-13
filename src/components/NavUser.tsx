"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

export function NavUser({
  user,
  type = "default",
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  type?: "default" | "table";
}) {
  const { isMobile } = useSidebar();

  return (
    <>
      {type === "table" ? (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 rounded-full border-[1px] border-[#beb6b6]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-medium text-[10px]">
              {user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 rounded-full border-[1px] border-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm gap-1 leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
