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
          onClick={() => {
            if (user?.verify !== "VERIFIED") {
              toast("Please complete KYC verification.", "Warning");
              setTimeout(() => {
                router.push("/dashboard/settings");
              }, 1000);
            } else if (user?.status === "SUSPENDED") {
              toast("Your account is suspended", "Warning");
            } else if (user?.status === "FREEZE") {
              toast(
                "Your account is frozen now. Please contact to support team",
                "Warning"
              );
              setTimeout(() => {
                router.push("/dashboard/support");
              }, 1000);
            } else {
              toast("You have some problems on your account.", "Warning");
            }
          }}
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
