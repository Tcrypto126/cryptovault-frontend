"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IconLoader2 } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useNotification } from "@/providers/notificationProvider";
import { useUserStore } from "@/store/userStore";
import { getTransactions, withdraw } from "@/api";
import { useTransactionStore } from "@/store/transactionStore";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  amount: z.number().min(1500, "Minimum withdrawal amount is $1500"),
});

export function WithdrawModal() {
  const { user, setUserData } = useUserStore();
  const { setTransactions } = useTransactionStore();
  const { toast } = useNotification();
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.amount > (user?.balance || 0)) {
      toast("Insufficient balance", "Error");
      return;
    }

    await withdraw(
      { ...data, type: "WITHDRAWAL" },
      async () => {
        setUserData({
          ...user,
          balance: (user?.balance || 0) - data.amount,
          recentWithdrawal: data.amount,
          recentWithdrawStatus: "PENDING",
        });
        await getTransactions(
          (transactions: any) => {
            setTransactions(transactions);
          },
          (message: string) => {
            toast(message, "Error");
          }
        );
        toast("Withdrawal request sent successfully", "Success");
        closeRef.current?.click();
        form.reset();
      },
      (message) => {
        toast(message, "Error");
      }
    );
  }

  const handleUserStatus = () => {
    const statusMessages = {
      UNVERIFIED: {
        message: "Please complete KYC verification.",
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

    if (user?.verify !== "VERIFIED") {
      const { message, redirect } = statusMessages.UNVERIFIED;
      toast(message, "Warning");
      if (redirect) {
        setTimeout(() => router.push(redirect), 1000);
      }
      return;
    }

    const userStatus = user?.status as keyof typeof statusMessages;
    if (statusMessages[userStatus]) {
      const { message } = statusMessages[userStatus];
      toast(message, "Warning");
      if ("redirect" in statusMessages[userStatus]) {
        const { redirect } = statusMessages[userStatus] as {
          redirect: string;
        };
        setTimeout(() => router.push(redirect), 1000);
      }
    } else {
      toast("Something went wrong!", "Warning");
    }
  };

  return (
    <Dialog>
      {user?.verify === "VERIFIED" && user?.status === "ACTIVE" ? (
        <DialogTrigger asChild>
          <Button variant="withdraw" className="!h-8 !w-full">
            Withdraw
          </Button>
        </DialogTrigger>
      ) : (
        <Button
          variant="withdraw"
          className="!h-8 !w-full"
          onClick={() => handleUserStatus()}
        >
          Withdraw
        </Button>
      )}
      <DialogContent
        className="!max-w-[90%] sm:!max-w-[500px] w-full px-4 py-6 sm:p-6 bg-[#12121C] border-[#373940]"
        aria-describedby="withdraw-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="!text-[18px] sm:!text-[24px] !font-medium">
            Withdraw
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-[5px] space-y-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Enter your Amount to withdraw"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                  <span className="text-[14px]">
                    Available balance: $
                    {(user?.balance || 0) > 1500
                      ? (user?.balance || 0).toFixed(2)
                      : 0}
                  </span>
                </FormItem>
              )}
            />

            <DialogFooter className="grid grid-cols-2 gap-4 !mt-6">
              <DialogClose ref={closeRef} asChild>
                <Button variant="withdraw">Cancel</Button>
              </DialogClose>
              <Button
                variant="deposit"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <IconLoader2 className="animate-spin" />
                ) : (
                  <>Send Request</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
