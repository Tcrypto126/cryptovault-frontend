"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import verifyToken from "@/lib/verifyToken";
import instance from "@/lib/axios";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    isRemember: boolean
  ) => Promise<{ message: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      try {
        const token: string | null = window.localStorage.getItem("token");
        const { isTokenValid, role } = await verifyToken(token || "");
        if (isTokenValid) {
          if (role === "USER" && pathname === "/admin-dashboard") {
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
            "/account/reset-password",
          ];
          if (publicRoutes.includes(pathname)) {
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
  }, [pathname, router]);

  const login = async (
    email: string,
    password: string,
    isRemember: boolean
  ) => {
    const res = await instance.post("/api/auth/signin", {
      email,
      password,
      isRemember,
    });

    if (res.status === 404) {
      return { message: "Email not found" };
    }
    if (res.status === 401) {
      return { message: "Invalid password" };
    }
    if (res.status !== 200) throw new Error("Login failed");

    const { token } = res.data;
    // Save token to localStorage (or cookies)
    localStorage.setItem("token", token);

    const { role } = res.data.user;

    if (role === "ADMIN") {
      router.push("/admin-dashboard");
    } else {
      router.push("/dashboard");
    }
    return { message: "Login successful" };
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete instance.defaults.headers.common.Authorization;
    setUser(null);
    router.push("/account/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
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
