import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  avatar?: string;
  email?: string;
  full_name?: string;
  // phone_number?: string;
  // address?: string;
  // government_id?: string;
  // id_card?: string;
  // username?: string;
  // role?: "ADMIN" | "USER";
  // status?: "ACTIVE" | "INACTIVE" | "FREEZE" | "SUSPENDED";
  // verify?: "UNVERIFIED" | "VERIFIED";
  // balance?: number;
  // bonus?: number;
}

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

  sender?: User;
  recipient?: User;
}

interface TransactionState {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

export const useTransactionStore = create(
  persist<TransactionState>(
    (set) => ({
      transactions: [],
      setTransactions: (transactions: Transaction[]) => {
        set({ transactions });
      },
    }),
    {
      name: "transactionStatus",
    }
  )
);
