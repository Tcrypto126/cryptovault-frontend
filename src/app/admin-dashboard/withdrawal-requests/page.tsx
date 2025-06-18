"use client";

import { useState } from "react";
import { DataTable } from "@/components/DataTableAdminWithdraw";

import { useTransactionStore } from "@/store/transactionStore";

const WithdrawalRequestsPage = () => {
  const { allTransactions } = useTransactionStore();

  const [tableData, setTableData] = useState<any[]>(
    allTransactions
      .filter((transaction: any) => transaction.type === "WITHDRAWAL")
      .map((transaction: any) => ({
        id: transaction.id,
        timestamp: transaction.created_at.split(".")[0].replace("T", " "),
        email: transaction.sender?.email || "Unknown",
        type: "Withdraw",
        amount: transaction.amount,
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
