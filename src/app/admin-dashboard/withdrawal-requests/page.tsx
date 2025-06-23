"use client";

import { useState } from "react";
import { DataTable, schema } from "@/components/DataTableAdminWithdraw";

import { Transaction, useTransactionStore } from "@/store";
import { z } from "zod";
import { formatLargeNumber } from "@/lib/utils";

const WithdrawalRequestsPage = () => {
  const { allTransactions } = useTransactionStore();

  const [tableData] = useState<z.infer<typeof schema>[]>(
    allTransactions
      .filter((transaction: Transaction) => transaction.type === "WITHDRAWAL")
      .map((transaction: Transaction) => ({
        id: transaction.id || "",
        timestamp:
          transaction.created_at?.split(".")[0].replace("T", " ") || "",
        user: {
          id: transaction.sender?.id || "",
          name: transaction.sender?.full_name || "",
          email: transaction.sender?.email || "",
          avatar:
            transaction.sender?.avatar || "/assets/avatars/avatar-default.png",
        },
        type: "Withdraw",
        amount: formatLargeNumber(transaction.amount || 0),
        status:
          transaction.status === "PENDING"
            ? "Pending"
            : transaction.status === "COMPLETED"
            ? "Approved"
            : "Failed",
      }))
  );

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Withdrawal Requests</h3>
      <div>
        <DataTable data={tableData} />
      </div>
    </div>
  );
};

export default WithdrawalRequestsPage;
