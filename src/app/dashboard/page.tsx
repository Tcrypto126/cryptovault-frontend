"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import { IconArrowDown, DollarBagIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import StatusCode from "@/components/status-code";
import { DataTable } from "@/components/data-table";

import data from "@/app/data.json";

const Dashboard = () => {
  const [progress, setProgress] = useState(60);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 border border-amber-400">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex flex-col justify-between gap-4 p-0 lg:p-4">
          <h1 className="max-w-[600px] !text-[28px] lg:!text-[40px] xl:!text-[56px]">
            Welcome to Custodial Crypto Wallet
          </h1>
          <p className="!text-[16px] text-text">
            Easily manage your balance — deposit funds, send to others, or
            request a withdrawal when ready. Stay in control, securely.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4 h-auto lg:h-[243px] bg-dashboard rounded-[12px]">
          <h5>Spin & Win</h5>
          <div
            className="relative flex flex-col gap-2 p-4 min-w-[100%] sm:min-w-[300px] rounded-[12px] overflow-hidden cursor-pointer bg-gradient-to-b from-[#98FFEF] to-[#00C8EB] hover:bg-gradient-to-bl"
            onClick={() => {
              alert("wheel of fortune");
            }}
          >
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 justify-between">
        <div className="flex flex-col justify-between w-full gap-4 p-4 bg-dashboard rounded-[12px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconWallet className="w-6 h-6" color="#838799" />
              <h6 className="text-[#838799]">Total Virtual Balance</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="text-[#838799]">USD</h6>
              <IconArrowDown width="24" height="24" color="#838799" />
            </div>
          </div>
          <h3 className="!text-[24px]">$2,123,982.20</h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">Profit Today</h6>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-[#1FB356] !font-bold">+$3,234.22</h5>
              <h5 className="text-[#1FB356] !font-bold">+12.3%</h5>
            </div>
          </div>
          <Button variant="deposit" className="!h-8">
            Deposit
          </Button>
        </div>
        <div className="flex flex-col justify-between w-full gap-4 p-4 bg-dashboard rounded-[12px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconWallet className="w-6 h-6" color="#838799" />
              <h6 className="text-[#838799]">Withdrawable Balance</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="text-[#838799]">USD</h6>
              <IconArrowDown width="24" height="24" color="#838799" />
            </div>
          </div>
          <h3 className="!text-[24px]">$2,123,982.20</h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">
              Last Withdraw Amount
            </h6>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-[#1FB356] !font-bold">+$3,234.22</h5>
              <StatusCode status="Success" />
            </div>
          </div>
          <Button variant="withdraw" className="!h-8">
            Withdraw
          </Button>
        </div>
        <div className="flex flex-col justify-between w-full gap-4 p-4 bg-dashboard rounded-[12px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DollarBagIcon width="24" height="24" />
              <h6 className="text-[#838799]">Total Bonus</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="text-[#838799]">USD</h6>
              <IconArrowDown width="24" height="24" color="#838799" />
            </div>
          </div>
          <h3 className="!text-[24px] !text-[#69CC8E]">$50,371.38</h3>
          <div className="flex flex-col gap-1">
            <Progress value={progress} className="bg-[#1FB356]" />
            <h6 className="!text-[14px]">USD</h6>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="!text-[14px] text-[#838799]">Last earned bonus</h6>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-[#1FB356] !font-bold">+$3,234.22</h5>
            </div>
          </div>
          <Button variant="deposit" className="!h-8">
            Send
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h5>Transactions</h5>
        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-4">
            <h6>Deposit</h6>
            <h6>Withdraw</h6>
            <h6>Send</h6>
          </div>
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 w-36 lg:w-2xs h-9 border-border text-[14px] !bg-transparent hover:!bg-[#ffffff13] transition-all duration-200"
            />
          </div>
        </div>
        <div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
