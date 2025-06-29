"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconWallet } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IconArrowDown, DollarBagIcon } from "@/components/ui/icon";

import StatusCode from "@/components/StatusBadge";
import { DataTable, schema } from "@/components/DataTableUserTransactions";
import WheelOfFortune from "@/components/WheelOfFortune";
import { SendBonusModal } from "@/components/SendBonusModal";
import { WithdrawModal } from "@/components/WithdrawModal";
import { DepositModal } from "@/components/DepositModal";
import Firework from "@/components/Firework";

import { useNotification } from "@/providers/notificationProvider";
import { useTransactionStore, useUserStore, Transaction } from "@/store";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { formatLargeNumber } from "@/lib/utils";

const Dashboard = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast } = useNotification();
  const { user } = useUserStore();
  const { transactions } = useTransactionStore();
  const router = useRouter();

  const [spinningModal, setSpinningModal] = useState<boolean>(false);
  const [spinningEnd, setSpinningEnd] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const progress = 60;

  const [tableData] = useState<z.infer<typeof schema>[]>(
    transactions.map((transaction: Transaction) => ({
      id: transaction.id || "",
      header: "No",
      type:
        transaction.type === "DEPOSIT"
          ? "Deposit"
          : transaction.type === "WITHDRAWAL"
          ? "Withdraw"
          : transaction.type === "TRANSFER" &&
            transaction.sender_id === user?.id
          ? "BonusSent"
          : "BonusReceived",
      amount: formatLargeNumber(transaction.amount || 0),
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
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient_id || ""
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender_id || ""
            : "Unknown",
        name:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.full_name || ""
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.full_name || ""
            : "Platform",
        email:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.email || ""
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.email || ""
            : "",
        avatar:
          transaction.type === "TRANSFER" && transaction.sender_id === user?.id
            ? transaction.recipient?.avatar ||
              "/assets/avatars/avatar-default.png"
            : transaction.type === "TRANSFER" &&
              transaction.recipient_id === user?.id
            ? transaction.sender?.avatar || "/assets/avatars/avatar-default.png"
            : "/assets/logo.png",
      },
      created_at: transaction.created_at?.split(".")[0].replace("T", " ") || "",
    }))
  );

  const handleSpinOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      wheelRef.current &&
      !wheelRef.current.contains(e.target as HTMLElement)
    ) {
      setSpinningModal(false);
    }
  };

  const handleSpin = () => {
    if (!user) return;

    const statusMessages = {
      UNVERIFIED: {
        message: "Please complete KYC verification.",
        redirect: "/dashboard/settings",
      },
      REJECTED: {
        message:
          "Your verification is rejected. Please re-submit your correct documents.",
        redirect: "/dashboard/settings",
      },
      SUSPENDED: {
        message: "Your account is suspended",
      },
      FREEZE: {
        message: "Your account is frozen now. Please contact to support team",
        redirect: "/dashboard/support",
      },
      INACTIVE: {
        message: "Your account not activated yet.",
      },
    };

    if (user.verify !== "VERIFIED") {
      const { message, redirect } =
        user?.verify === "REJECTED"
          ? statusMessages.REJECTED
          : statusMessages.UNVERIFIED;
      toast(message, "Warning");
      if (redirect) {
        setTimeout(() => router.push(redirect), 1000);
      }
      return;
    }

    const userStatus = user.status as keyof typeof statusMessages;
    if (statusMessages[userStatus]) {
      const { message } = statusMessages[userStatus];
      toast(message, "Warning");
      if ("redirect" in statusMessages[userStatus]) {
        const { redirect } = statusMessages[userStatus] as {
          redirect: string;
        };
        setTimeout(() => router.push(redirect), 1000);
      }
      return;
    }

    if (user?.availableSpins && user?.availableSpins > 0) {
      setSpinningModal(true);
    } else {
      setSpinningModal(false);
      toast("You have no spins available", "Warning");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
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
          <div className="flex items-center justify-between">
            <h5>Spin & Win</h5>
            {user?.availableSpins && user?.availableSpins > 0 ? (
              <p className="!text-[14px] !text-[#11da5b] max-w-[130px] z-10 animate-[bounce_1s_ease-in-out_infinite]">
                <span className="!text-[20px] !font-bold">
                  {user?.availableSpins}
                </span>{" "}
                spins available
              </p>
            ) : (
              <p className="!text-[14px] !text-[#0d8d3c] max-w-[130px] z-10">
                No spins available
              </p>
            )}
          </div>
          <div
            className="relative flex flex-col gap-2 p-4 min-w-[100%] sm:min-w-[300px] rounded-[12px] overflow-hidden cursor-pointer bg-gradient-to-b from-[#98FFEF] to-[#00C8EB] hover:bg-gradient-to-bl"
            onClick={handleSpin}
          >
            <Image
              src="/assets/dashboard/noto_wrapped-gift.png"
              alt="gift"
              width={158}
              height={135}
              className="absolute bottom-0 right-0"
            />
            <h3 className="!text-[28px] text-black z-10">
              {user?.availableSpins && user?.availableSpins > 0
                ? "Available"
                : "Not available"}
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
        {/* Total Virtual Balance */}
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
          <h3 className="!text-[24px]">${formatLargeNumber(user?.balance || 0)}</h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">Profit Recently</h6>
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

        {/* Withdrawable Balance */}
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
            ${(user?.balance || 0) > 1500 ? formatLargeNumber(user?.balance || 0) : 0}
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

        {/* Total Bonus */}
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
          <h3 className="!text-[24px] !text-[#69CC8E]">
            ${formatLargeNumber(user?.bonus || 0)}
          </h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} className="bg-[#1FB356]" />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">Last Earned Bonus</h6>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-[#1FB356] !font-bold">
                +${formatLargeNumber(user?.recentBonus || 0)}
              </h5>
            </div>
          </div>
          <SendBonusModal />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h5>Transactions</h5>
        <div>
          <DataTable data={tableData} />
        </div>
      </div>
      {/* spinning modal */}
      {spinningModal && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 bg-[#000000c4] flex items-center justify-center"
          onClick={handleSpinOutSideClick}
        >
          {spinningEnd && <Firework />}
          <div
            className="max-w-[500px] w-full z-60"
            ref={processing ? null : wheelRef}
          >
            <WheelOfFortune
              spinningEnd={spinningEnd}
              setSpinningEnd={setSpinningEnd}
              setSpinningModal={setSpinningModal}
              setProcessing={setProcessing}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
