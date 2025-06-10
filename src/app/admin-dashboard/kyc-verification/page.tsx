"use client";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

import { DataTable } from "@/components/DataTableAdminKYC";

const data = [
  {
    id: 1,
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    submitted: "2025-06-11 14:30:25",
    status: "Approved",
  },
  {
    id: 2,
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    submitted: "2025-06-11 14:30:25",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    submitted: "2025-06-11 14:30:25",
    status: "Approved",
  },
];

const KYCverification = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3>KYC Submissions</h3>
        {/* <Button variant="deposit" className="flex items-center gap-2 h-12">
          <IconPlus />
          Create New Incentive
        </Button> */}
      </div>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default KYCverification;
