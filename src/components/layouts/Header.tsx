"use client";

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
import {
  IconDashboard,
  IconLogout,
  IconLayoutDashboard,
} from "@tabler/icons-react";

import {
  HomeIcon,
  FeaturesIcon,
  SecurityIcon,
  SupportIcon,
  WorksIcon,
} from "../ui/icon";

import { useAuth } from "@/providers/authProvider";
import { useUserStore } from "@/store";

const Header = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { user } = useUserStore();

  const menuItems = [
    { title: "Home", link: "/", icon: <HomeIcon width="20" height="20" /> },
    {
      title: "Dashboard",
      link: user?.role === "ADMIN" ? "/admin-dashboard" : "/dashboard",
      icon: <IconLayoutDashboard width="20" height="20" />,
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
              src="/assets/logo_text.png"
              width={130}
              height={100}
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
                      href={item.link}
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

            {localStorage.getItem("token") ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 rounded-full cursor-pointer">
                    <AvatarImage src={user?.avatar} alt="avatar" />
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
                        if (user?.role === "ADMIN") {
                          router.push("/admin-dashboard");
                        } else {
                          router.push("/dashboard");
                        }
                      }}
                    >
                      <IconLayoutDashboard />
                      {user?.role === "ADMIN" ? "Admin Dashboard" : "Dashboard"}
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
