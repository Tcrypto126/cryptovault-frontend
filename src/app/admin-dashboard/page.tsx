"use client";

import { useEffect, useRef, useState } from "react";
import { UsersIcon, TotalBalanceIcon, PeddingIcon } from "@/components/ui/icon";
import { useUserStore } from "@/store/userStore";
import { useTransactionStore } from "@/store";
import { DataTable } from "@/components/DataTableAdminTransactions";

// import data from "@/app/adminTransactionData.json";

const Dashboard = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const { users } = useUserStore();
  const { allTransactions } = useTransactionStore();
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [totalAvailableBalance, setTotalAvailableBalance] = useState<number>(0);

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

  const [pendingApproval, setPendingApproval] = useState<number>(
    allTransactions.filter(
      (transaction) =>
        transaction.status === "PENDING" && transaction.type === "WITHDRAWAL"
    ).length
  );

  useEffect(() => {
    setTotalActiveUsers(
      users?.filter((user) => user.status === "ACTIVE").length || 0
    );
    setTotalAvailableBalance(
      users
        ?.filter((user) => user.status === "ACTIVE")
        .reduce((total, user) => total + (user.balance || 0), 0) || 0
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
          <h3 className="!text-[24px]">${totalAvailableBalance.toFixed(2)}</h3>
          <p className="!text-[14px]">Available for transfers.</p>
        </div>
        <div className="flex flex-col justify-between w-full gap-2 p-4 rounded-[12px] bg-dashboard">
          <div className="flex items-center gap-3">
            <PeddingIcon width="40" height="40" />
            <h6>Pending Approval</h6>
          </div>
          <h3 className="!text-[24px]">{pendingApproval}</h3>
          <p className="!text-[14px]">Requests awaiting admin review</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h5>Recent Activity</h5>
        <div>
          <DataTable data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
