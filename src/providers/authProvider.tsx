"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  useSupportStore,
  useTransactionStore,
  useUserStore,
  Transaction,
  Support,
} from "@/store";
import { User } from "@/store/userStore";

import { useNotification } from "./notificationProvider";
import verifyToken from "@/lib/verifyToken";
import instance from "@/lib/axios";
import {
  getAllUsers,
  getSupports,
  getTransactions,
  getAllTransactions,
  getAllSupports,
} from "@/api";

type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  login: (email: string, password: string, isRemember: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { signout, setUserData, user, setUsersData } = useUserStore();
  const { setTransactions, setAllTransactions, signoutTransaction } =
    useTransactionStore();
  const { setSupports, setAllSupports, signoutSupport } = useSupportStore();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useNotification();

  useEffect(() => {
    const init = async () => {
      try {
        const token: string | null = window.localStorage.getItem("token");
        const {
          isTokenValid,
          user,
        }: { isTokenValid: boolean; user: User | null } = await verifyToken(
          token || ""
        );

        if (user?.status === "SUSPENDED") {
          toast("Your account is suspended", "Warning");
          logout();
        } else if (user?.status === "FREEZE") {
          toast(
            "Your account is frozen now. Please contact to support team",
            "Warning"
          );
          setTimeout(() => {
            router.push("/dashboard/support");
          }, 1000);
        }

        const allowedRoutes = ["/account/signin", "/account/signup"];

        if (isTokenValid && allowedRoutes.includes(pathname)) {
          router.push("/dashboard");
        }

        if (isTokenValid) {
          await getTransactions(
            (transactions: Transaction[]) => {
              setTransactions(transactions);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );

          await getSupports(
            (supports: Support[]) => {
              setSupports(supports);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );

          if (user?.role === "ADMIN") {
            await getAllUsers(
              (users: User[]) => {
                setUsersData(users);
              },
              (message: string) => {
                toast(message, "Error");
              }
            );

            await getAllTransactions(
              (transactions: Transaction[]) => {
                setAllTransactions(transactions);
              },
              (message: string) => {
                toast(message, "Error");
              }
            );

            await getAllSupports(
              (supports: Support[]) => {
                setAllSupports(supports);
              },
              (message: string) => {
                toast(message, "Error");
              }
            );
          }

          const newUser: User = {
            ...user,
            sentTransactions: [],
            receivedTransactions: [],
            recentDeposit: user?.receivedTransactions
              ?.filter(
                (transaction: Transaction) => transaction.type === "DEPOSIT"
              )
              .sort(
                (a: Transaction, b: Transaction) =>
                  new Date(b?.created_at || "").getTime() -
                  new Date(a?.created_at || "").getTime()
              )[0]?.amount,
            recentWithdrawal: user?.sentTransactions
              ?.filter(
                (transaction: Transaction) => transaction.type === "WITHDRAWAL"
              )
              .sort(
                (a: Transaction, b: Transaction) =>
                  new Date(b?.created_at || "").getTime() -
                  new Date(a?.created_at || "").getTime()
              )[0]?.amount,
            recentBonus: user?.receivedTransactions
              ?.filter(
                (transaction: Transaction) => transaction.type === "BONUS"
              )
              .sort(
                (a: Transaction, b: Transaction) =>
                  new Date(b?.created_at || "").getTime() -
                  new Date(a?.created_at || "").getTime()
              )[0]?.amount,
            recentWithdrawStatus: user?.sentTransactions
              ?.filter(
                (transaction: Transaction) => transaction.type === "WITHDRAWAL"
              )
              .sort(
                (a: Transaction, b: Transaction) =>
                  new Date(b?.created_at || "").getTime() -
                  new Date(a?.created_at || "").getTime()
              )[0]?.status,
          };
          setUserData(newUser);

          if (user?.role === "USER" && pathname.includes("/admin-dashboard")) {
            router.push("/dashboard");
          }
        } else {
          localStorage.removeItem("token");
          delete instance.defaults.headers.common.Authorization;
          signout();
          signoutTransaction();
          signoutSupport();

          // Allow access to public routes without redirect
          const publicRoutes = [
            "/",
            "/account/signin",
            "/account/signup",
            "/account/forgot-password",
            "/account/email-sents",
            "/loading",
          ];
          if (
            publicRoutes.includes(pathname) ||
            pathname.includes("/reset-password") ||
            pathname.includes("/verify-email")
          ) {
            return;
          }

          // Redirect to signin for protected routes when no valid token
          router.push("/account/signin");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("error: ", error);
          // Handle case where error.response may not exist
          const message =
            error instanceof Object && "response" in error
              ? (error.response as { data: { message: string } }).data.message
              : error.message;
          toast(message, "Error");
        } else {
          toast("An unknown error occurred", "Error");
        }
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
        if (!user?.isEmailVerified) {
          router.push("/account/email-sents");
          return;
        }
        localStorage.setItem("token", token);
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;

        const newUser: User = {
          ...user,
          sentTransactions: [],
          receivedTransactions: [],
          recentDeposit: user?.receivedTransactions
            ?.filter(
              (transaction: Transaction) => transaction.type === "DEPOSIT"
            )
            .sort(
              (a: Transaction, b: Transaction) =>
                new Date(b?.created_at || "").getTime() -
                new Date(a?.created_at || "").getTime()
            )[0]?.amount,
          recentWithdrawal: user?.sentTransactions
            ?.filter(
              (transaction: Transaction) => transaction.type === "WITHDRAWAL"
            )
            .sort(
              (a: Transaction, b: Transaction) =>
                new Date(b?.created_at || "").getTime() -
                new Date(a?.created_at || "").getTime()
            )[0]?.amount,
          recentBonus: user?.receivedTransactions
            ?.filter((transaction: Transaction) => transaction.type === "BONUS")
            .sort(
              (a: Transaction, b: Transaction) =>
                new Date(b?.created_at || "").getTime() -
                new Date(a?.created_at || "").getTime()
            )[0]?.amount,
          recentWithdrawStatus: user?.sentTransactions
            ?.filter(
              (transaction: Transaction) => transaction.type === "WITHDRAWAL"
            )
            .sort(
              (a: Transaction, b: Transaction) =>
                new Date(b?.created_at || "").getTime() -
                new Date(a?.created_at || "").getTime()
            )[0]?.status,
        };
        setUserData(newUser);

        await getTransactions(
          (transactions: Transaction[]) => {
            setTransactions(transactions);
          },
          (message: string) => {
            toast(message, "Error");
          }
        );

        if (user?.role === "ADMIN") {
          await getAllUsers(
            (users: User[]) => {
              setUsersData(users);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );

          await getAllTransactions(
            (transactions: Transaction[]) => {
              setAllTransactions(transactions);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );
        }

        toast("Logged in successfully", "Success");

        if (user?.role === "ADMIN") {
          router.push("/admin-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast(res.data.message, "Error");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      if (error instanceof Error) {
        console.error("error: ", error);
        // Handle case where error.response may not exist
        const message =
          error instanceof Object && "response" in error
            ? (error.response as { data: { message: string } }).data.message
            : error.message;
        toast(message, "Error");
      } else {
        toast("An unknown error occurred", "Error");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete instance.defaults.headers.common.Authorization;
    signout();
    signoutTransaction();
    signoutSupport();
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
