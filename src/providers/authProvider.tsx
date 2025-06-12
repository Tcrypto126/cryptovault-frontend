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
  ) => Promise<void>;
  logout: () => void;
};

const setSession = (token?: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log("token is valid");
  } else {
    localStorage.removeItem("token");
    delete instance.defaults.headers.common.Authorization;
    console.log("token is invalid1");
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (await verifyToken(token || "")) {
          setSession(token);
        } else {
          console.log("token is invalid2");
          console.log("pathname: ", pathname);

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
    const res = await instance.post("/api/auth/login", {
      email,
      password,
      isRemember,
    });

    if (res.status !== 200) throw new Error("Login failed");

    const { token } = await res.data();

    // Save token to localStorage (or cookies)
    localStorage.setItem("token", token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ id: payload.id, name: payload.name, email: payload.email });

    router.push("/"); // redirect to home after login
  };

  const logout = () => {
    localStorage.removeItem("token");
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
