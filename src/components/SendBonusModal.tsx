"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { getTransactions, sendBonus } from "@/api";
import { useUserStore } from "@/store/userStore";
import { useTransactionStore } from "@/store/transactionStore";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),

  amount: z.number().min(1, { message: "Amount is required" }),

  description: z.string(),
});

export function SendBonusModal() {
  const { toast } = useNotification();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { user, setUserData } = useUserStore();
  const { setTransactions } = useTransactionStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      amount: 0,
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    if (data.amount > (user?.bonus || 0)) {
      toast("Insufficient balance", "Error");
      return;
    }

    sendBonus(
      { ...data, type: "TRANSFER" },
      async () => {
        setUserData({
          ...user,
          bonus: (user?.bonus || 0) - data.amount,
        });
        await getTransactions(
          (transactions: any) => {
            setTransactions(transactions);
          },
          (message: string) => {
            toast(message, "Error");
          }
        );
        setIsSubmitting(false);
        toast("Bonus sent successfully", "Success");
        closeRef.current?.click();
        form.reset();
      },
      (message) => {
        setIsSubmitting(false);
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
      REJECTED: {
        message: "Your verification is rejected. Please re-submit your correct documents.",
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
          <Button variant="deposit" className="!h-8 !w-full">
            Send
          </Button>
        </DialogTrigger>
      ) : (
        <Button
          variant="deposit"
          className="!h-8 !w-full"
          onClick={() => handleUserStatus()}
        >
          Send
        </Button>
      )}
      <DialogContent
        className="!max-w-[90%] sm:!max-w-[500px] w-full px-4 py-6 sm:p-6 bg-[#12121C] border-[#373940]"
        aria-describedby="send-bonus-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="!text-[18px] sm:!text-[24px] !font-medium">
            Send Bonus to Another User
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-[5px] space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient's Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your Recipient's Email"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
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
                      placeholder="Enter your Amount to Send"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                  <span className="text-[14px]">
                    Available balance: ${user?.bonus}
                  </span>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a note..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="grid grid-cols-2 gap-4 !mt-6">
              <DialogClose ref={closeRef} asChild>
                <Button variant="withdraw">Cancel</Button>
              </DialogClose>
              <Button variant="deposit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <IconLoader2 className="animate-spin" />
                ) : (
                  <>Send Now</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
