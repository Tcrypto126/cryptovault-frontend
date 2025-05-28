"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  login: (email: string, password: string, isRemember: boolean) => Promise<void>;
  logout: () => void;
};

const setSession = (token?: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete instance.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (await verifyToken(token || "")) {
          setSession(token);
        } else {

        }
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string, isRemember: boolean) => {
    const res = await instance.post("/api/auth/login", {email, password, isRemember});

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
    router.push("/login");
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
