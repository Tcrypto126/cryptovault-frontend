"use client";

import { useState, useRef } from "react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useNotification } from "@/providers/notificationProvider";

const FormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),

  subject: z.string().nonempty({ message: "Subject is required" }),

  message: z.string().nonempty({ message: "Message is required" }),
});

export function SupportModal() {
  const { toast } = useNotification();
  const [isSendding, setIsSendding] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSendding(true);
    setTimeout(() => {
      setIsSendding(false);
      toast("welcome", "Success");
      closeRef.current?.click();
      form.reset();
    }, 3000);

    console.log("data: ", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="deposit" className="!h-8">
          Need Help?
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[90%] sm:!max-w-[500px] w-full px-4 py-6 sm:p-6 bg-[#12121C] border-[#373940] ">
        <DialogHeader>
          <DialogTitle className="!text-[18px] sm:!text-[24px] !font-medium">
            Open a Support Request
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your Email"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your subject"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a note..."
                      className="!min-h-28"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <DialogFooter className="grid grid-cols-2 gap-4 !mt-8">
              <DialogClose ref={closeRef} asChild>
                <Button variant="withdraw">Cancel</Button>
              </DialogClose>
              <Button variant="deposit" type="submit" disabled={isSendding}>
                {isSendding ? (
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
