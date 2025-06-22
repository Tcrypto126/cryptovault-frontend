"use client";

import { DataTable, schema } from "@/components/DataTableUserTransactions";

import { useState } from "react";
import { Transaction, useTransactionStore } from "@/store";
import { useUserStore } from "@/store";
import { z } from "zod";

const TransactionsPage = () => {
  const { transactions } = useTransactionStore();
  const { user } = useUserStore();

  const [tableData] = useState<z.infer<typeof schema>[]>(
    transactions.map((transaction: Transaction) => ({
      id: transaction.id || "",
      header: "No",
      type:
        transaction.type === "DEPOSIT"
          ? "Deposit"
          : transaction.type === "WITHDRAWAL"
          ? "Withdraw"
          : transaction.type === "TRANSFER" &&
            transaction.sender_id === user?.id
          ? "BonusSent"
          : "BonusReceived",
      amount: transaction.amount || 0,
      status:
        transaction.status === "COMPLETED"
          ? "Success"
          : transaction.status === "FAILED"
          ? "Failed"
          : transaction.status === "CANCELLED"
          ? "Cancelled"
          : "Pending",
      user: {
        id:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient_id || ""
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender_id || ""
            : "Unknown",
        name:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.full_name || ""
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.full_name || ""
            : "Platform",
        email:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.email || ""
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.email || ""
            : "",
        avatar:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.avatar ||
              "/assets/avatars/avatar-default.png"
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.avatar || "/assets/avatars/avatar-default.png"
            : "/assets/logo.png",
      },
      created_at: transaction.created_at?.split(".")[0].replace("T", " ") || "",
    }))
  );

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h3>Transactions</h3>
      <DataTable data={tableData} />
    </div>
  );
};

export default TransactionsPage;
