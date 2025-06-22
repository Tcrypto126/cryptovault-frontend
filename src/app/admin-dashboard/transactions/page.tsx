"use client";

import { useState } from "react";
import { DataTable, schema } from "@/components/DataTableAdminTransactions";
import { useTransactionStore, Transaction } from "@/store";
import { z } from "zod";

const TransactionsPage = () => {
  const { allTransactions } = useTransactionStore();

  const [tableData] = useState<z.infer<typeof schema>[]>(
    allTransactions.map((transaction: Transaction) => ({
      id: transaction.id || "",
      timestamp: transaction.created_at?.split(".")[0].replace("T", " ") || "",
      email: transaction.sender?.email || transaction.recipient?.email || "",
      type:
        transaction.type === "DEPOSIT"
          ? "Deposit"
          : transaction.type === "WITHDRAWAL"
          ? "Withdraw"
          : transaction.type === "TRANSFER"
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
          transaction.type === "TRANSFER" ? transaction.recipient_id || "" : "",
        name:
          transaction.type === "TRANSFER"
            ? transaction.recipient?.full_name || ""
            : "Platform",
        email:
          transaction.type === "TRANSFER"
            ? transaction.recipient?.email || ""
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
