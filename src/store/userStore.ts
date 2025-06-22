import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "./transactionStore";

export interface User {
  id?: string;
  avatar?: string;
  email?: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
  government_id?: string;
  id_card?: string;
  username?: string;
  created_at?: string;
  updated_at?: string;
  role?: "ADMIN" | "USER";
  status?: "ACTIVE" | "INACTIVE" | "FREEZE" | "SUSPENDED";
  verify?: "UNVERIFIED" | "VERIFIED" | "REJECTED";
  balance?: number;
  bonus?: number;
  availableSpins?: number;

  recentDeposit?: number;
  recentWithdrawal?: number;
  recentWithdrawStatus?: "COMPLETED" | "FAILED" | "PENDING" | "CANCELLED";
  recentBonus?: number;

  transactions?: Transaction[];
  sentTransactions?: Transaction[];
  receivedTransactions?: Transaction[];
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
