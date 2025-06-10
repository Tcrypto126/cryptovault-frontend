"use client";

import { DataTable } from "@/components/DataTableWithdraw";

import data from "@/app/adminTransactionData.json";

const WithdrawalRequestsPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Withdrawal Requests</h3>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default WithdrawalRequestsPage;
