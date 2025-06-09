import Image from "next/image";
import { Button } from "./ui/button";

const DepositModal = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 bg-[#00000050] flex justify-center items-center">
      <div className="flex flex-col gap-4 px-4 py-6 sm:px-6 w-full max-w-[90%] md:max-w-[550px] bg-[#12121C] border-[#373940] border rounded-[12px]">
        <h5>Boost Your Balance & Unlock Rewards!</h5>
        <div className="relative flex flex-col gap-2 p-4 w-full rounded-[12px] overflow-hidden bg-gradient-to-b from-[#98FFEF] to-[#00C8EB] hover:bg-gradient-to-bl">
          <Image
            src="/assets/dashboard/noto_wrapped-gift.png"
            alt="gift"
            width={158}
            height={135}
            className="absolute bottom-0 right-0"
          />
          <h3 className="!text-[28px] text-black z-10">$500</h3>
          <p className="!text-[14px] !text-black w-full max-w-[230px] z-10">
            Deposit $500 or more and get a 5% Bonus!
          </p>
        </div>
        <h5> Your reward will be instantly reflected in your wallet.</h5>
        <h6>Valid until: September 30th, 2025</h6>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-4">
            <h5>Deposit Amount</h5>
            <span>$500</span>
            <span>$1000</span>
            <span>$2000</span>
          </div>
          <div className="flex flex-col gap-4 max-w-[123px]">
            <h5>Bonus You Get</h5>
            <span className="text-[#1FB356]">$25</span>
            <span className="text-[#1FB356]">$50</span>
            <span className="text-[#1FB356]">$100</span>
          </div>
        </div>
        <Button className="!h-9" variant="deposit">
          Deposit Now
        </Button>
      </div>
    </div>
  );
};

export default DepositModal;
