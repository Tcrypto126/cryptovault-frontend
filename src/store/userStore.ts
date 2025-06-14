import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface User {
  id?: string;
  avatar?: string;
  email?: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
  government_id?: string;
  id_card?: string;
  username?: string;
  role?: "ADMIN" | "USER";
  status?: "ACTIVE" | "INACTIVE" | "FREEZE" | "SUSPENDED";
  verify?: "UNVERIFIED" | "VERIFIED";
  balance?: number;
  bonus?: number;
}

interface UserState {
  user?: User;
  setUserData: (data: User) => void;
  signout: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: undefined,
      setUserData: (data: User) => {
        set({ user: data });
      },
      signout: () => {
        set({ user: undefined });
      },
    }),
    {
      name: "loginStatus"
    }
  )
)