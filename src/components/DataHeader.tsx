"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavUser } from "./NavUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { IconSearch, IconBell, IconSettings } from "@tabler/icons-react";
import verifyToken from "@/lib/verifyToken";
import instance from "@/lib/axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const DataHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
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
            onClick={() => {
              if (role === "ADMIN") {
                router.push("/admin-dashboard/settings");
              } else {
                router.push("/dashboard/settings");
              }
            }}
          >
            <IconSettings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataHeader;
