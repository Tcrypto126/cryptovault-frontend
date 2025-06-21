"use client";

import { useNotification } from "@/providers/notificationProvider";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { verifyEmail } from "@/api";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      verifyEmail(
        token,
        () => {
          toast("Email verified successfully", "Success");
          router.push("/account/signin");
        },
        (message) => {
          toast(message, "Error");
        }
      );
    }
  }, []);
  return <></>;
};

export default VerifyEmail;
