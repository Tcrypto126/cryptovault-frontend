"use client";

import { useState } from "react";
import { IconWallet, IconLoader2, IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IconArrowDown, DollarBagIcon } from "@/components/ui/icon";

import { WithdrawModal } from "@/components/withdraw-modal";
import StatusCode from "@/components/status-badge";

const Wallet = () => {
  const [isDepositing, setIsDepositing] = useState(false);
  const [progress, setProgress] = useState(60);

  const handleDeposit = () => {
    setIsDepositing(true);
    setTimeout(() => {
      setIsDepositing(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-4 md:p-6 border border-amber-400">
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
          <div className="flex flex-col justify-center items-center w-full gap-4 p-4 bg-[#00EBC770] rounded-[12px]">
            <IconPlus size={40} />
            <h6 className="!text-[24px] text-center">Deposit More</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
