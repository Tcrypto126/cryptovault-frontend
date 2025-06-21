"use client";

import { useAuth } from "@/providers/authProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EmailSent = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
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
            <h3 className="!text-[20px] md:!text-3xl">Email Verification</h3>
            <h6>
              We’ve sent a email verification link to {user?.email}. Please
              check your inbox and follow the instructions in the email to
              verify your email.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
