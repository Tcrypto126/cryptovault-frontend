"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
} from "@/components/ui/form";

import { useNotification } from "@/providers/notificationProvider";

const FormSchema = z.object({
  fullName: z.string().nonempty({ message: "Full name is required" }),
  email: z.string().nonempty({ message: "Email is required" }),
  dateOfSubmission: z
    .string()
    .nonempty({ message: "Date of submission is required" }),
  ipAddress: z.string().nonempty({ message: "IP address is required" }),
  device: z.string().nonempty({ message: "Device is required" }),
  documents: z.array(z.string()).nonempty({ message: "Documents is required" }),
});

export function KYCapproveModal({
  id,
  fullName,
  email,
  dateOfSubmission,
  ipAddress,
  device,
  documents,
}: {
  id: string;
  fullName: string;
  email: string;
  dateOfSubmission: string;
  ipAddress: string;
  device: string;
  documents: Array<string>;
}) {
  const { toast } = useNotification();
  const [isSendding, setIsSendding] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: fullName,
      email: email,
      dateOfSubmission: dateOfSubmission,
      ipAddress: ipAddress || "192.168.142.78",
      device: device || "Desktop",
      documents: documents,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSendding(true);
    setTimeout(() => {
      setIsSendding(false);
      toast("Successfully added new incentive", "Success");
      closeRef.current?.click();
      form.reset();
    }, 3000);

    console.log("data: ", data);
  }

  function reject() {
    console.log("reject");
    toast("Successfully rejected", "Success");
    closeRef.current?.click();
  }

  function approve() {
    console.log("approve");
    toast("Successfully approved", "Success");
    closeRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
          size="icon"
        >
          <IconEye color="#00A6E8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[90%] sm:!max-w-[500px] w-full px-4 py-6 sm:p-6 bg-[#12121C] border-[#373940] ">
        <DialogHeader>
          <DialogTitle className="!text-[18px] sm:!text-[24px] !font-medium">
            User Info
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-[5px] space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfSubmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Submission</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your date of submission"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ipAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IP Address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your IP address"
                        disabled
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="device"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your device"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documents</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2 text-sm">
                      {documents.map((document, index) => (
                        <Link
                          key={index}
                          href={document}
                          target="_blank"
                          className="text-blue-500"
                        >
                          {index === 0 ? "Government ID" : "ID Card"}
                        </Link>
                      ))}
                    </div>
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <DialogFooter className="grid grid-cols-2 gap-4 !mt-6">
              <DialogClose ref={closeRef} asChild className="hidden">
                <Button variant="withdraw" type="button">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                variant="withdraw"
                type="button"
                onClick={() => {
                  reject();
                }}
              >
                Reject
              </Button>
              <Button
                variant="spin"
                type="button"
                disabled={isSendding}
                onClick={() => {
                  approve();
                }}
              >
                Approve
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
