"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  approveWithdrawal as approveWithdrawalApi,
  getAllTransactions,
} from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNotification } from "@/providers/notificationProvider";
import { IconLoader2 } from "@tabler/icons-react";

export function WithdrawApproveModalAdmin({
  id,
  email,
  amount,
}: {
  id: string;
  email: string;
  amount: number;
}) {
  const { toast } = useNotification();
  const [isApproveing, setIsApproveing] = useState(false);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);

  const approveWithdrawal = async () => {
    setIsApproveing(true);
    await approveWithdrawalApi(
      id,
      email,
      amount,
      async () => {
        await getAllTransactions(
          (transactions) => {
            setAllTransactions(transactions);
          },
          (message) => {
            toast(message, "Error");
          }
        );
        toast("You approved withdrawal request successfully!", "Success");
        setIsApproveing(false);
      },
      (message) => {
        toast(message, "Error");
        setIsApproveing(false);
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="deposit" size="sm">
          Approve
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="!bg-[#12121C]">
        <AlertDialogHeader>
          <AlertDialogTitle className="!text-[24px]">
            Approve Withdrawal
          </AlertDialogTitle>
          <AlertDialogDescription className="!text-[16px]">
            Are you sure you want to approve this withdrawal request?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={approveWithdrawal}
            disabled={isApproveing}
          >
            {isApproveing ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              "Approve"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
