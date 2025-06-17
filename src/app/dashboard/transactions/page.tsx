"use client";

import { DataTable } from "@/components/DataTableUserTransactions";

import { useState } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import { useUserStore } from "@/store/userStore";

const TransactionsPage = () => {
  const { transactions } = useTransactionStore();
  const { user } = useUserStore();

  const [tableData, setTableData] = useState<any[]>(
    transactions.map((transaction: any) => ({
      id: transaction.id,
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
      amount: transaction.amount.toString(),
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
            ? transaction.recipient_id
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender_id
            : "Unknown",
        name:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.full_name || "Unknown"
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.full_name || "Unknown"
            : "Platform",
        email:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.email || "Unknown"
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.email || "Unknown"
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
