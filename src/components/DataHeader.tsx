"use client";

import { usePathname } from "next/navigation";
import { NavUser } from "./NavUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { IconSearch, IconBell, IconSettings } from "@tabler/icons-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/assets/avatars/user-sample.png",
  },
};

const DataHeader = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex justify-between items-center gap-2 w-full">
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden lg:block">
            <NavUser user={data.user} />
          </div>
          <Separator
            orientation="vertical"
            className="!w-[1px] !h-5 hidden lg:block"
          />
          {!pathname.includes("/admin-dashboard") && (
            <Button
              variant="deposit"
              className="w-24 h-9"
              onClick={() => {
                alert("Diposited successfully");
              }}
            >
              Deposit
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 w-36 lg:w-3xs h-9 border-border text-[14px] !bg-transparent hover:!bg-[#ffffff13] transition-all duration-200"
            />
          </div>
          <Button
            variant="outline"
            className="w-9 h-9 cursor-pointer !bg-transparent hover:!bg-[#ffffff13]"
            onClick={() => {}}
          >
            <IconBell className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="w-9 h-9 cursor-pointer !bg-transparent hover:!bg-[#ffffff13]"
            onClick={() => {}}
          >
            <IconSettings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataHeader;
