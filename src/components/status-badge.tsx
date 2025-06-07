"use client";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Success":
      return (
        <h6 className="!text-[12px] py-1 text-center bg-[#1FB35690] min-w-[75px] rounded-[6px]">
          Success
        </h6>
      );
    case "Pending":
      return (
        <h6 className="!text-[12px] py-1 text-center bg-[#E8AD0090] min-w-[75px] rounded-[6px]">
          Pending
        </h6>
      );
    case "Failed":
      return (
        <h6 className="!text-[12px] py-1 text-center bg-[#E62E2E90] min-w-[75px] rounded-[6px]">
          Failed
        </h6>
      );
  }
};

export default StatusBadge;
