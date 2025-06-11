"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEdit, IconLoader2 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useNotification } from "@/providers/notificationProvider";

const FormSchema = z.object({
  campaignName: z.string().nonempty({ message: "Campaign name is required" }),
  incentiveType: z.string().nonempty({ message: "Incentive type is required" }),
  bonusType: z.string().nonempty({ message: "Bonus type is required" }),
  activePeriodFrom: z
    .string()
    .nonempty({ message: "Active period is required" }),
  activePeriodTo: z.string().nonempty({ message: "Active period is required" }),
});

export function EditDepositIncentiveModal({
  id,
  campaignName,
  incentiveType,
  bonusType,
  activePeriodFrom,
  activePeriodTo,   
}: {
  id: number;
  campaignName: string;
  incentiveType: string;
  bonusType: string;
  activePeriodFrom: string;
  activePeriodTo: string;
}) {
  const { toast } = useNotification();
  const [isSendding, setIsSendding] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      campaignName: campaignName,
      incentiveType: incentiveType,
      bonusType: bonusType,
      activePeriodFrom: activePeriodFrom,
      activePeriodTo: activePeriodTo,
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
          size="icon"
        >
          <IconEdit color="#00A6E8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[90%] sm:!max-w-[500px] w-full px-4 py-6 sm:p-6 bg-[#12121C] border-[#373940] ">
        <DialogHeader>
          <DialogTitle className="!text-[18px] sm:!text-[24px] !font-medium">
            Create Incentive
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-[5px] space-y-4"
          >
            <FormField
              control={form.control}
              name="campaignName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your Campaign Name"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="incentiveType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incentive Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value as string}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select incentive type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popup">Pop-up</SelectItem>
                        <SelectItem value="direct-deposit">
                          Direct-deposit
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bonusType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bonus Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value as string}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bonus type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5%">5%</SelectItem>
                        <SelectItem value="10%">10%</SelectItem>
                        <SelectItem value="15%">15%</SelectItem>
                        <SelectItem value="20%">20%</SelectItem>
                        <SelectItem value="50$">$50</SelectItem>
                        <SelectItem value="$100">$100</SelectItem>
                        <SelectItem value="$300">$300</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="activePeriodFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active Period (From)</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-full h-12 !bg-[#02050eee] border-[#373940] justify-between font-normal"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date?.toISOString());
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activePeriodTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active Period (To)</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <Popover open={open2} onOpenChange={setOpen2}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-full h-12 !bg-[#02050eee] border-[#373940] justify-between font-normal"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date?.toISOString());
                                setOpen2(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="grid grid-cols-2 gap-4 !mt-6">
              <DialogClose ref={closeRef} asChild>
                <Button variant="withdraw">Cancel</Button>
              </DialogClose>
              <Button variant="deposit" type="submit" disabled={isSendding}>
                {isSendding ? (
                  <IconLoader2 className="animate-spin" />
                ) : (
                  <>Add Now</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
