"use client";

import Image from "next/image";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useNotification } from "@/providers/notificationProvider";
import { IconLoader2 } from "@tabler/icons-react";
import { deposit } from "@/api";
import { useUserStore } from "@/store/userStore";

export function DepositModal() {
  const { user, setUserData } = useUserStore();
  const { toast } = useNotification();
  const [isSendding, setIsSendding] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleDeposit = async () => {
    setIsSendding(true);
    const amount = 1000;
    await deposit(
      { amount, type: "DEPOSIT" },
      () => {
        setUserData({
          ...user,
          balance: (user?.balance || 0) + amount,
          recentDeposit: amount,
        });
        toast("Deposited successfully", "Success");
        closeRef.current?.click();
        setIsSendding(false);
      },
      (message) => {
        toast(message, "Error");
        setIsSendding(false);
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="deposit" className="!h-8 !w-full">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="!max-w-[90%] sm:!max-w-[500px] w-full px-4 py-6 sm:p-6 bg-[#12121C] border-[#373940]"
        aria-describedby="deposit-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="!text-[18px] sm:!text-[24px] !font-medium">
            Boost Your Balance & Unlock Rewards!
          </DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-col gap-2 p-4 w-full rounded-[12px] overflow-hidden bg-gradient-to-b from-[#98FFEF] to-[#00C8EB] hover:bg-gradient-to-bl">
          <Image
            src="/assets/dashboard/noto_wrapped-gift.png"
            alt="gift"
            width={158}
            height={135}
            className="absolute bottom-0 right-0"
          />
          <h3 className="!text-[28px] text-black z-10">$500</h3>
          <p className="!text-[14px] !text-black w-full max-w-[230px] z-10">
            Deposit $500 or more and get a 5% Bonus!
          </p>
        </div>
        <h5> Your reward will be instantly reflected in your wallet.</h5>
        <h6>Valid until: September 30th, 2025</h6>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-4">
            <h5>Deposit Amount</h5>
            <span>$500</span>
            <span>$1000</span>
            <span>$2000</span>
          </div>
          <div className="flex flex-col gap-4 max-w-[123px]">
            <h5>Bonus You Get</h5>
            <span className="text-[#1FB356]">$25</span>
            <span className="text-[#1FB356]">$50</span>
            <span className="text-[#1FB356]">$100</span>
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-4 !mt-6">
          <DialogClose ref={closeRef} asChild>
            <Button variant="withdraw">Cancel</Button>
          </DialogClose>
          <Button
            variant="deposit"
            type="button"
            disabled={isSendding}
            onClick={() => {
              handleDeposit();
            }}
          >
            {isSendding ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <>Deposit Now</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
