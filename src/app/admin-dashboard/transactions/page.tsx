"use client";

import { useState } from "react";
import { DataTable } from "@/components/DataTableAdminTransactions";
import { useTransactionStore } from "@/store/transactionStore";

const TransactionsPage = () => {
  const { allTransactions } = useTransactionStore();

  const [tableData, setTableData] = useState<any[]>(
    allTransactions.map((transaction: any) => ({
      id: transaction.id,
      timestamp: transaction.created_at.split(".")[0].replace("T", " "),
      email:
        transaction.sender?.email || transaction.recipient?.email || "Unknown",
      type:
        transaction.type === "DEPOSIT"
          ? "Deposit"
          : transaction.type === "WITHDRAWAL"
          ? "Withdraw"
          : transaction.type === "TRANSFER"
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
          transaction.type === "TRANSFER"
            ? transaction.recipient_id
            : "Unknown",
        name:
          transaction.type === "TRANSFER"
            ? transaction.recipient?.full_name || "Unknown"
            : "Platform",
        email:
          transaction.type === "TRANSFER"
            ? transaction.recipient?.email || "Unknown"
            : "",
        avatar:
          transaction.type === "TRANSFER"
            ? transaction.recipient?.avatar ||
              "/assets/avatars/avatar-default.png"
            : "/assets/logo.png",
      },
    }))
  );

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Transactions</h3>
      <div>
        <DataTable data={tableData} />
      </div>
    </div>
  );
};

export default TransactionsPage;
