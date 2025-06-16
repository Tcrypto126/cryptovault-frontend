"use client";

import React, { useRef, useState } from "react";
import WheelOfFortune from "@armin-eslami/wheel-of-fortune";
import { Button } from "./ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { useUserStore } from "@/store/userStore";
import { addBonus } from "@/api";
import { useNotification } from "@/providers/notificationProvider";

type WheelSegment = {
  id: number;
  title: string;
  color: string;
  textColor: string;
};

const segments: WheelSegment[] = [
  { id: 1, title: "$50", color: "#47CD4B", textColor: "#FFFFFF" },
  { id: 2, title: "$100", color: "#FD8A16", textColor: "#000000" },
  { id: 3, title: "$200", color: "#1DA4FD", textColor: "#FFFFFF" },
  { id: 4, title: "$300", color: "#CF0B61", textColor: "#000000" },
  { id: 5, title: "$400", color: "#6B16FE", textColor: "#FFFFFF" },
  { id: 6, title: "$500", color: "#4BE2D2", textColor: "#000000" },
  { id: 7, title: "$600", color: "#8B8B8B", textColor: "#FFFFFF" },
  { id: 8, title: "$700", color: "#EB2C0C", textColor: "#000000" },
  // Add more segments here
];

function WheelOfFortune1({
  setSpinValue,
  spinningEnd,
  setSpinningEnd,
  setSpinningModal,
}: {
  setSpinValue: (value: number) => void;
  spinningEnd: boolean;
  setSpinningEnd: (value: boolean) => void;
  setSpinningModal: (value: boolean) => void;
}) {
  const { user, setUserData } = useUserStore();
  const { toast } = useNotification();
  const [spinning, setSpinning] = useState(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [targetSegmentId, setTargetSegmentId] = useState<number | undefined>();
  const [isAdding, setIsAdding] = useState(false);

  const spinWheel = () => {
    if (spinning || resetting) return;
    // Replace with real logic to choose which segment the wheel should stop on.
    const targetId = Math.floor(Math.random() * segments.length) + 1;
    setTargetSegmentId(targetId);
    setSpinning(true);
  };

  const onStop = () => {
    setSpinning(false);
    setSpinningEnd(true);
  };

  const addBonusToUser = () => {
    const bonus = Number(
      targetSegmentId && segments[targetSegmentId - 1]?.title.replace("$", "")
    );
    setIsAdding(true);

    addBonus(
      { amount: bonus },
      () => {
        setUserData({
          ...user,
          bonus: user?.bonus || 0 + bonus,
        });
        toast("Bonus added successfully", "Success");
        setIsAdding(false);
        setUserData({
          ...user,
          bonus: user?.bonus || 0 + bonus,
        });
        setTimeout(() => {
          setSpinValue(bonus);
          setSpinningEnd(false);
          setSpinningModal(false);
          setIsAdding(false);
        }, 3000);
      },
      (message) => {
        toast(message, "Error");
        setIsAdding(false);
      }
    );
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center gap-10 p-4">
      <WheelOfFortune
        className="w-full"
        segments={segments}
        spinning={spinning}
        targetSegementId={targetSegmentId}
        onStop={onStop}
        onReset={setResetting}
        spinDuration={5000}
      />
      {!spinningEnd ? (
        <Button
          onClick={spinWheel}
          variant="spin"
          className="w-full text-white h-[32px] sm:h-[45px]"
        >
          Spin the Wheel
        </Button>
      ) : (
        <Button
          onClick={addBonusToUser}
          variant="spin"
          className="w-full text-white h-[32px] sm:h-[45px]"
        >
          {isAdding ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            <>Add to Bonus Balance</>
          )}
        </Button>
      )}

      <div
        className={`flex flex-col items-center justify-center gap-2 animate-[bounce_1s_ease-in-out_infinite] ${
          spinningEnd ? "block" : "hidden"
        }`}
      >
        <h6 className="!text-[24px] text-[#838799] font-bold animate-[pulse_1s_ease-in-out_infinite]">
          🎉 Congratulations! 🎉
        </h6>
        <h5 className="text-[#1FB356] !font-bold text-center">
          You have won{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F0D279] via-[#E8AD00] to-[#F0D279] !font-bold text-[28px] animate-[scale_0.5s_ease-in-out_infinite]">
            {targetSegmentId && segments[targetSegmentId - 1]?.title}
          </span>{" "}
          bonus!
        </h5>
      </div>
    </main>
  );
}

export default WheelOfFortune1;
