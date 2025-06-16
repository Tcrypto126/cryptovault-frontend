"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store";

import { useNotification } from "./notificationProvider";
import verifyToken from "@/lib/verifyToken";
import instance from "@/lib/axios";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  login: (email: string, password: string, isRemember: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { signout, setUserData, user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useNotification();

  useEffect(() => {
    const init = async () => {
      try {
        const token: string | null = window.localStorage.getItem("token");
        const { isTokenValid, user }: { isTokenValid: boolean; user: any } =
          await verifyToken(token || "");

        if (isTokenValid) {
          const newUser = {
            ...user,
            recentDeposit: user.receivedTransactions
              ?.filter((transaction: any) => transaction.type === "DEPOSIT")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.amount,
            recentWithdrawal: user.sentTransactions
              ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.amount,
            recentBonus: user.receivedTransactions
              ?.filter((transaction: any) => transaction.type === "BONUS")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.amount,
            recentWithdrawStatus: user.sentTransactions
              ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.status,
          };
          setUserData(newUser);
          console.log("user: ", newUser);

          if (user.role === "USER" && pathname.includes("/admin-dashboard")) {
            router.push("/dashboard");
          }
        } else {
          localStorage.removeItem("token");
          delete instance.defaults.headers.common.Authorization;

          // Allow access to public routes without redirect
          const publicRoutes = [
            "/",
            "/account/signin",
            "/account/signup",
            "/account/forgot-password",
          ];
          if (
            publicRoutes.includes(pathname) ||
            pathname.includes("/reset-password")
          ) {
            return;
          }

          // Redirect to signin for protected routes when no valid token
          router.push("/account/signin");
        }
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, [pathname, router, setUserData]);

  const login = async (
    email: string,
    password: string,
    isRemember: boolean
  ) => {
    try {
      const res = await instance.post("api/auth/signin", {
        email,
        password,
        isRemember,
      });

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        toast("Logged in successfully", "Success");

        const role: "ADMIN" | "USER" = user.role;

        if (role === "ADMIN") {
          router.push("/admin-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast(res.data.message, "Error");
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast(error.response.data.message, "Error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    signout();
    router.push("/account/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user: user as User, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
