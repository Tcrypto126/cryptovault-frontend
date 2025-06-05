"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 border border-amber-400">
      <div className="flex justify-between items-center gap-6">
        <div className="flex flex-col gap-2 p-4">
          <h1>Welcome to Custodial Crypto Wallet</h1>
          <p className="!text-[16px] text-text">
            Easily manage your balance — deposit funds, send to others, or
            request a withdrawal when ready. Stay in control, securely.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-dashboard rounded-[12px]">
          <h5>Spin & Win</h5>
          <div className="relative flex flex-col gap-2 p-4 w-[300px] rounded-[12px] overflow-hidden cursor-pointer bg-gradient-to-b from-[#98FFEF] to-[#00C8EB] hover:from-[#69e6d3] hover:to-[#01c0e2]">
            <Image
              src="/assets/dashboard/noto_wrapped-gift.png"
              alt="gift"
              width={158}
              height={135}
              className="absolute bottom-0 right-0"
            />
            <h3 className="!text-[28px] text-black z-10">Available</h3>
            <p className="!text-[14px] !text-black max-w-[130px] z-10">
              Spin the Wheel and Win a Bonus!
            </p>
            <Button className="text-[14px] text-white p-4 w-24 cursor-pointer hover:bg-[#30be64] bg-[#1FB356] z-10">
              Spin Now
            </Button>
          </div>
        </div>
      </div>
      <div>sdf</div>
      <div>sdf</div>
    </div>
  );
};

export default Dashboard;
