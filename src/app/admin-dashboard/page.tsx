"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconWallet, IconLoader2 } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  IconArrowDown,
  DollarBagIcon,
  UsersIcon,
  TotalBalanceIcon,
  PeddingIcon,
} from "@/components/ui/icon";

import StatusCode from "@/components/StatusBadge";
import WheelOfFortune from "@/components/WheelOfFortune";
import { SendBonusModal } from "@/components/SendBonusModal";
import { WithdrawModal } from "@/components/WithdrawModal";
import DepositModal from "@/components/DepositModal";
import Firework from "@/components/Firework";
import { DataTable } from "@/components/DataTableAdmin";

import { useNotification } from "@/providers/notificationProvider";

import data from "@/app/data.json";

const Dashboard = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const [spinningAvailable, setSpinningAvailable] = useState(true);
  const [spinningModal, setSpinningModal] = useState(false);
  const [spinningEnd, setSpinningEnd] = useState(false);

  const [spinValue, setSpinValue] = useState<number | null>(null);

  const [progress, setProgress] = useState(60);
  const { toast } = useNotification();

  const handleDeposit = () => {
    setIsDepositing(true);
    setIsDepositModalOpen(true);
    setTimeout(() => {
      setIsDepositing(false);
      setIsDepositModalOpen(false);
    }, 3000);

    toast("Deposit successful", "Success");
  };

  const handleSpinOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      wheelRef.current &&
      !wheelRef.current.contains(e.target as HTMLElement)
    ) {
      setSpinningModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 justify-between">
        <div className="flex flex-col justify-between w-full gap-2 p-4 rounded-[12px] bg-[url('/assets/dashboard/user-bg.png')] bg-cover bg-center">
          <div className="flex items-center gap-3">
            <UsersIcon width="40" height="40" />
            <h6>Total Users</h6>
          </div>
          <h3 className="!text-[24px]">234</h3>
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
