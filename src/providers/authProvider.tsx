"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTransactionStore, useUserStore } from "@/store";

import { useNotification } from "./notificationProvider";
import verifyToken from "@/lib/verifyToken";
import instance from "@/lib/axios";
import { getAllTransactions } from "@/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
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
  const { setTransactions, signoutTransaction } = useTransactionStore();
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
          const newUser: any = {
            ...user,
            transactions: user.receivedTransactions
              .concat(user.sentTransactions)
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              ),
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

          await getAllTransactions(
            (transactions: any) => {
              setTransactions(transactions);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );

          if (user.role === "USER" && pathname.includes("/admin-dashboard")) {
            router.push("/dashboard");
          }
        } else {
          localStorage.removeItem("token");
          delete instance.defaults.headers.common.Authorization;
          signoutTransaction();
          signout();

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
  }, []);

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
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;

        const newUser: any = {
          ...user,
          transactions: user.receivedTransactions
            .concat(user.sentTransactions)
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            ),
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

        await getAllTransactions(
          (transactions: any) => {
            setTransactions(transactions);
          },
          (message: string) => {
            toast(message, "Error");
          }
        );

        toast("Logged in successfully", "Success");

        if (user.role === "ADMIN") {
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
    signoutTransaction();
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
