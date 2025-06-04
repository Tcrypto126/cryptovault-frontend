"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNotification } from "@/providers/notificationProvider";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff } from "@/components/ui/icon";
import { useState } from "react";
import Link from "next/link";

const FormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
});

const ForgotPassword = () => {
  const { toast } = useNotification();
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);
  const [isEmail, setIsEmail] = useState("a@a.com");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("welcome", "success");
    console.log("data: ", data);
    setIsEmail(data.email);
    setIsSent(true);
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-[url('/assets/signin/sign-bg.webp')] bg-cover bg-center bg-no-repeat">
        <div className="w-full max-w-[1440px] flex flex-col md:flex-row gap-4 lg:gap-20 justify-center items-center md:items-start px-4 py-4 lg:px-24">
          <div className="flex-1 max-w-[500px] flex flex-col gap-3 md:gap-6">
            <h1 className="!text-[24px] md:!text-5xl leading-[2rem] md:leading-[4rem] text-center md:text-start">
              Secure Your Crypto Journey
            </h1>
            <h4 className="text-center md:text-start">
              Register with your email to access your secure crypto wallet and
              manage your funds safely. Keep your balance, stay in control.
            </h4>
          </div>
          <div className="flex-1 w-full md:max-w-[500px] flex flex-col gap-5 md:gap-10 p-4 md:p-12 bg-[#ffffff1e] rounded-2xl">
            <Image
              src="/assets/logo.svg"
              width={60}
              height={60}
              alt="logo"
              className="cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            />
            <div className="flex flex-col gap-2">
              <h3 className="!text-[20px] md:!text-3xl">
                {!isSent ? <>Forgot Password</> : <>Email Sent</>}
              </h3>
              <h6>
                {!isSent ? (
                  <>Enter your email to reset your password.</>
                ) : (
                  <>
                    We’ve sent a password reset link to {isEmail}. Please
                    check your inbox and follow the instructions in the email to
                    reset your password.
                  </>
                )}
              </h6>
            </div>
            {!isSent ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 py-3 px-4 text-white bg-button-p hover:bg-button-pu cursor-pointer"
                    onClick={() => {}}
                  >
                    Reset Password
                  </Button>
                  <div className="flex gap-2 justify-center items-center">
                    <h6 className="!text-sm">Already have an account?</h6>
                    <Link
                      href="/account/signin"
                      className="text-[#00A6E8] hover:text-[#7cd5f8] text-sm"
                    >
                      Sign In
                    </Link>
                  </div>
                </form>
              </Form>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
