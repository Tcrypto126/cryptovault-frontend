"use client";

import { useState } from "react";
import Image from "next/image";
import { IconWallet, IconLoader2 } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IconArrowDown, DollarBagIcon } from "@/components/ui/icon";

import StatusCode from "@/components/status-badge";
import { DataTable } from "@/components/data-table-user";
import WheelOfFortune from "@/components/wheel-of-fortune";
import { SendBonusModal } from "@/components/send-bonus-modal";
import { WithdrawModal } from "@/components/withdraw-modal";

import { useNotification } from "@/providers/notificationProvider";

import data from "@/app/data.json";

const Dashboard = () => {
  const [isDepositing, setIsDepositing] = useState(false);
  const [progress, setProgress] = useState(60);
  const [spinning, setSpinning] = useState(false);
  const { toast } = useNotification();

  const handleDeposit = () => {
    setIsDepositing(true);
    setTimeout(() => {
      setIsDepositing(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 border border-amber-400">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col justify-between gap-4 p-0 lg:p-4">
          <h1 className="max-w-[600px] !text-[28px] lg:!text-[40px] xl:!text-[56px]">
            Welcome to Custodial Crypto Wallet
          </h1>
          <p className="!text-[16px] text-text">
            Easily manage your balance — deposit funds, send to others, or
            request a withdrawal when ready. Stay in control, securely.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4 h-auto md:h-[243px] bg-dashboard rounded-[12px]">
          <h5>Spin & Win</h5>
          <div
            className="relative flex flex-col gap-2 p-4 min-w-[100%] sm:min-w-[300px] rounded-[12px] overflow-hidden cursor-pointer bg-gradient-to-b from-[#98FFEF] to-[#00C8EB] hover:bg-gradient-to-bl"
            onClick={() => {
              if (spinning) {
                alert("wheel of fortune");
              } else {
                toast("You are not available to spin", "Warning");
              }
            }}
          >
            <Image
              src="/assets/dashboard/noto_wrapped-gift.png"
              alt="gift"
              width={158}
              height={135}
              className="absolute bottom-0 right-0"
            />
            <h3 className="!text-[28px] text-black z-10">
              {spinning ? "Available" : "Not available"}
            </h3>
            <p className="!text-[14px] !text-black max-w-[130px] z-10">
              Spin the Wheel and Win a Bonus!
            </p>
            <Button className="text-[14px] text-white p-4 w-24 cursor-pointer hover:bg-[#30be64] bg-[#1FB356] z-10">
              Spin Now
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 justify-between">
        <div className="flex flex-col justify-between w-full gap-4 p-4 bg-dashboard rounded-[12px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconWallet className="w-6 h-6" color="#838799" />
              <h6 className="text-[#838799]">Total Virtual Balance</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="text-[#838799]">USD</h6>
              <IconArrowDown width="24" height="24" color="#838799" />
            </div>
          </div>
          <h3 className="!text-[24px]">$2,123,982.20</h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">Profit Today</h6>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-[#1FB356] !font-bold">+$3,234.22</h5>
              <h5 className="text-[#1FB356] !font-bold">+12.3%</h5>
            </div>
          </div>
          <Button
            variant="deposit"
            className="!h-8"
            disabled={isDepositing}
            onClick={() => {
              handleDeposit();
            }}
          >
            {isDepositing ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <>Deposit</>
            )}
          </Button>
        </div>
        <div className="flex flex-col justify-between w-full gap-4 p-4 bg-dashboard rounded-[12px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconWallet className="w-6 h-6" color="#838799" />
              <h6 className="text-[#838799]">Withdrawable Balance</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="text-[#838799]">USD</h6>
              <IconArrowDown width="24" height="24" color="#838799" />
            </div>
          </div>
          <h3 className="!text-[24px]">$2,123,982.20</h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">
              Last Withdraw Amount
            </h6>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-[#1FB356] !font-bold">+$3,234.22</h5>
              <StatusCode status="Success" />
            </div>
          </div>
          <WithdrawModal />
        </div>
        <div className="flex flex-col justify-between w-full gap-4 p-4 bg-dashboard rounded-[12px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DollarBagIcon width="24" height="24" />
              <h6 className="text-[#838799]">Total Bonus</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="text-[#838799]">USD</h6>
              <IconArrowDown width="24" height="24" color="#838799" />
            </div>
          </div>
          <h3 className="!text-[24px] !text-[#69CC8E]">$50,371.38</h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} className="bg-[#1FB356]" />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">Last earned bonus</h6>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-[#1FB356] !font-bold">+$3,234.22</h5>
            </div>
          </div>
          <SendBonusModal />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h5>Transactions</h5>
        <div className="overflow-hidden">
          <DataTable data={data} />
        </div>
      </div>

      <div className="hidden">
        <WheelOfFortune />
      </div>
    </div>
  );
};

export default Dashboard;
