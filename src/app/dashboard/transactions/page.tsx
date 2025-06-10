"use client";

import { DataTable } from "@/components/DataTableUserTransactions";

import data from "@/app/data.json";

const TransactionsPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h3>Transactions</h3>
      <DataTable data={data} />
    </div>
  );
};

export default TransactionsPage;
