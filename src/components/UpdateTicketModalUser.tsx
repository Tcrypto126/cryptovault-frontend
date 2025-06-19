"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconLoader2 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogClose,
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
import { Textarea } from "./ui/textarea";
import { getSupports, updateSupport } from "@/api";
import { useSupportStore } from "@/store/supportStore";

const FormSchema = z.object({
  ticketId: z.string(),
  email: z.string().email(),
  message: z.string(),
  lastUpdated: z.string(),
  reply: z.string().nonempty({ message: "Reply is required" }),
});

export function UpdateTicketModalUser({
  id,
  ticketId,
  user,
  message,
  lastUpdated,
  reply,
  status,
}: {
  id: string;
  ticketId: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  message: string;
  lastUpdated: string;
  reply: string;
  status: string;
}) {
  const { toast } = useNotification();
  const [isSendding, setIsSendding] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { setSupports } = useSupportStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ticketId: ticketId,
      email: user.email,
      message: message,
      lastUpdated: lastUpdated,
      reply: reply || " ",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSendding(true);
    updateSupport(
      id,
      data.message,
      "",
      "INPROGRESS",
      () => {
        getSupports(
          (supports: any) => {
            setSupports(supports);
          },
          (message: string) => {
            toast(message, "Error");
            setIsSendding(false);
          }
        );
        toast("Successfully sent message", "Success");
        closeRef.current?.click();
      },
      (message: string) => {
        toast(message, "Error");
        setIsSendding(false);
      }
    );
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
              name="ticketId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket ID</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter ticket id"
                      disabled
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your message"
                      {...field}
                      disabled={status === "Resolved"}
                      className="!h-[30px]"
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reply</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your reply"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <DialogFooter className="grid grid-cols-2 gap-4 !mt-6">
              <DialogClose asChild>
                <Button variant="withdraw">Cancel</Button>
              </DialogClose>
              <Button
                variant="spin"
                type="submit"
                disabled={isSendding || status === "Resolved"}
              >
                {isSendding ? (
                  <IconLoader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
