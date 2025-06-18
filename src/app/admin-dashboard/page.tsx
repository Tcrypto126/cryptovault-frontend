"use client";

import { useEffect, useRef, useState } from "react";
import { UsersIcon, TotalBalanceIcon, PeddingIcon } from "@/components/ui/icon";
import { useUserStore } from "@/store/userStore";
import { DataTable } from "@/components/DataTableAdminTransactions";

import data from "@/app/adminTransactionData.json";

const Dashboard = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const { users } = useUserStore();
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);

  useEffect(() => {
    console.log("users: ", users);
    setTotalActiveUsers(
      users?.filter((user) => user.status === "ACTIVE").length || 0
    );
  }, [users]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 justify-between">
        <div className="flex flex-col justify-between w-full gap-2 p-4 rounded-[12px] bg-[url('/assets/dashboard/user-bg.png')] bg-cover bg-center">
          <div className="flex items-center gap-3">
            <UsersIcon width="40" height="40" />
            <h6>Total Users</h6>
          </div>
          <h3 className="!text-[24px]">{totalActiveUsers}</h3>
          <p className="!text-[14px]">
            Active users registered on the platform.
          </p>
        </div>
        <div className="flex flex-col justify-between w-full gap-2 p-4 rounded-[12px] bg-dashboard">
          <div className="flex items-center gap-3">
            <TotalBalanceIcon width="40" height="40" />
            <h6>Total Platform Balance</h6>
          </div>
          <h3 className="!text-[24px]">$2,313,482.44</h3>
          <p className="!text-[14px]">Available for transfers.</p>
        </div>
        <div className="flex flex-col justify-between w-full gap-2 p-4 rounded-[12px] bg-dashboard">
          <div className="flex items-center gap-3">
            <PeddingIcon width="40" height="40" />
            <h6>Pending Approval</h6>
          </div>
          <h3 className="!text-[24px]">21</h3>
          <p className="!text-[14px]">Requests awaiting admin review</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h5>Recent Activity</h5>
        <div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
