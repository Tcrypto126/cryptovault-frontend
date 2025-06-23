"use client";

import { IconWallet, IconPlus } from "@tabler/icons-react";

import { Progress } from "@/components/ui/progress";
import { IconArrowDown } from "@/components/ui/icon";

import { WithdrawModal } from "@/components/WithdrawModal";
import StatusCode from "@/components/StatusBadge";
import { DepositModal } from "@/components/DepositModal";
import { useUserStore } from "@/store/userStore";
import { formatLargeNumber } from "@/lib/utils";

const WalletPage = () => {
  const { user } = useUserStore();
  const progress = 60;

  return (
    <>
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <h3>Wallet</h3>
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
            <h3 className="!text-[24px]">
              ${formatLargeNumber(user?.balance || 0)}
            </h3>
            <div className="flex flex-col gap-1">
              <Progress value={progress} />
              <h6 className="!text-[14px]">USD</h6>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="!text-[14px] text-[#838799]">Profit Today</h6>
              <div className="flex justify-between items-center gap-2">
                <h5 className="text-[#1FB356] !font-bold">
                  +${formatLargeNumber(user?.recentDeposit || 0)}
                </h5>
                <h5 className="text-[#1FB356] !font-bold">
                  +
                  {user?.balance == 0
                    ? 0
                    : (
                        ((user?.recentDeposit || 0) / (user?.balance || 0)) *
                        100
                      ).toFixed(2)}
                  %
                </h5>
              </div>
            </div>
            <DepositModal />
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
            <h3 className="!text-[24px]">
              $
              {(user?.balance || 0) > 1500
                ? formatLargeNumber(user?.balance || 0)
                : 0}
            </h3>
            <div className="flex flex-col gap-1">
              <Progress value={progress} />
              <h6 className="!text-[14px]">USD</h6>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="!text-[14px] text-[#838799]">
                Last Withdraw Amount
              </h6>
              <div className="flex justify-between items-center gap-2">
                <h5 className="text-[#1FB356] !font-bold">
                  +${formatLargeNumber(user?.recentWithdrawal || 0)}
                </h5>
                <StatusCode
                  status={
                    user?.recentWithdrawStatus == "COMPLETED"
                      ? "Success"
                      : user?.recentWithdrawStatus == "FAILED"
                      ? "Failed"
                      : user?.recentWithdrawStatus == "CANCELLED"
                      ? "Cancelled"
                      : "Pending"
                  }
                />
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

export default WalletPage;
