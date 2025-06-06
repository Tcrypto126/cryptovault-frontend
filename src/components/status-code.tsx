"use client";

const StatusCode = ({ status }: { status: string }) => {
  switch (status) {
    case "Success":
      return (
        <h6 className="!text-[12px] py-1 px-4 bg-[#1FB356] rounded-[6px]">
          Success
        </h6>
      );
    case "Pending":
      return (
        <h6 className="!text-[12px] py-1 px-4 bg-[#1FB356] rounded-[6px]">
          Pending
        </h6>
      );
    case "Failed":
      return <></>;
  }
};

export default StatusCode;
