"use client";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Success":
    case "Active":
      return (
        <h6 className="!text-[12px] py-1 text-center bg-[#1FB35690] min-w-[75px] rounded-[6px]">
          {status}
        </h6>
      );
    case "Pending":
    case "Freeze":
      return (
        <h6 className="!text-[12px] py-1 text-center bg-[#E8AD0090] min-w-[75px] rounded-[6px]">
          {status}
        </h6>
      );
    case "Failed":
    case "Suspended":
      return (
        <h6 className="!text-[12px] py-1 text-center bg-[#E62E2E90] min-w-[75px] rounded-[6px]">
          {status}
        </h6>
      );
    case "Inactive":
      return (
        <h6 className="!text-[12px] py-1 text-center bg-[#61616190] min-w-[75px] rounded-[6px]">
          {status}
        </h6>
      );
  }
};

export default StatusBadge;
