"use client";

import { DataTable } from "@/components/DataTableAdminTransactions";

import data from "@/app/adminTransactionData.json";

const TransactionsPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Transactions</h3>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default TransactionsPage;
