import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Transaction {
  id?: string;
  amount?: number;
  type?: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "BONUS";
  status?: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  sender_id?: string;
  recipient_id?: string;

  sender?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
  recipient?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
}

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

  recentDeposit?: number;
  recentWithdrawal?: number;
  recentWithdrawStatus?: "COMPLETED" | "FAILED" | "PENDING" | "CANCELLED";
  recentBonus?: number;

  transactions?: Transaction[];
}

interface UserState {
  user?: User;
  users?: User[];
  setUserData: (data: User) => void;
  setUsersData: (data: User[]) => void;
  signout: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: undefined,
      users: [],
      setUserData: (data: User) => {
        set({ user: data });
      },
      setUsersData: (data: User[]) => {
        set({ users: data });
      },
      signout: () => {
        set({ user: undefined, users: [] });
      },
    }),
    {
      name: "loginStatus",
    }
  )
);
