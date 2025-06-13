"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDashboard, IconLogout } from "@tabler/icons-react";

import {
  HomeIcon,
  DashboardIcon,
  FeaturesIcon,
  SecurityIcon,
  SupportIcon,
  WorksIcon,
} from "../ui/icon";

import { useAuth } from "@/providers/authProvider";
import verifyToken from "@/lib/verifyToken";

import instance from "@/lib/axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const Header = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const [avatar, setAvatar] = useState("/assets/avatars/user-sample.png");

  useEffect(() => {
    const init = async () => {
      try {
        const token: string | null = window.localStorage.getItem("token");
        const { isTokenValid, role } = await verifyToken(token || "");
        if (isTokenValid) {
          setIsLoggedIn(true);
          setRole(role as "ADMIN" | "USER");

          const res = await instance.get("/api/user/profile");
          if (res.status == 200) {
            setAvatar(`${SERVER_URL}/assets/${res.data.user.avatar}`);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    init();
  }, []);

  const menuItems = [
    { title: "Home", link: "/", icon: <HomeIcon width="20" height="20" /> },
    {
      title: "Dashboard",
      link: "/admin-dashboard",
      icon: <DashboardIcon width="20" height="20" />,
    },
    {
      title: "Features",
      link: "/features",
      icon: <FeaturesIcon width="20" height="20" />,
    },
    {
      title: "Security",
      link: "/security",
      icon: <SecurityIcon width="20" height="20" />,
    },
    {
      title: "Support",
      link: "/support",
      icon: <SupportIcon width="20" height="20" />,
    },
    {
      title: "Works",
      link: "/works",
      icon: <WorksIcon width="20" height="20" />,
    },
  ];

  return (
    <>
      <div className="fixed w-full z-50">
        <div className="max-w-[1440px] h-[92px] m-auto px-2.5 lg:px-20 pt-4">
          <div className="w-full flex items-center justify-between gap-2">
            <Image
              src="/assets/logo.svg"
              width={54}
              height={54}
              alt="logo"
              className="cursor-pointer hidden lg:block"
              onClick={() => {
                router.push("/");
              }}
            />
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="border-border border-1 rounded-full h-16 p-2">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      onClick={() => {
                        router.push(`${item.link}`);
                      }}
                      className="cursor-pointer rounded-full px-4 py-3 font-medium text-[16px] text-[#A7ADBE] hover:bg-menu hover:text-white"
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="!p-0 !w-8 !h-8 cursor-pointer"
                  >
                    <Image
                      src="/assets/icon/toggle.svg"
                      width={16}
                      height={16}
                      alt="toggle"
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="px-4 py-6 border-none w-full sm:w-[282px] bg-[url('/assets/home/mobile-menu-bg.png')] bg-cover bg-no-repeat"
                >
                  <SheetHeader className="z-20">
                    <SheetTitle className="flex justify-center">
                      <Image
                        src="/assets/logo.svg"
                        width={54}
                        height={54}
                        alt="logo"
                      />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.link}
                        className="py-2 px-4 flex items-center gap-4 rounded-[8px] hover:bg-gradient-to-b from-[#9387E3] to-[#6C5DD3] transition-all duration-200 hover:scale-105"
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 rounded-full cursor-pointer">
                    <AvatarImage src={avatar} alt="avatar" />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-46 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        if (role === "ADMIN") {
                          router.push("/admin-dashboard");
                        } else {
                          router.push("/dashboard");
                        }
                      }}
                    >
                      <IconDashboard />
                      {role === "ADMIN" ? "Admin Dashboard" : "Dashboard"}
                    </DropdownMenuItem>
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
            ) : (
              <div className="flex gap-3">
                <Button
                  className="login-button"
                  onClick={() => {
                    router.push("/account/signin");
                  }}
                >
                  Sign in
                </Button>
                <Button
                  className="signup-button"
                  onClick={() => {
                    router.push("/account/signup");
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
