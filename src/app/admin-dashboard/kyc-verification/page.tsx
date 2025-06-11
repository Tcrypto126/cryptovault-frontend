"use client";

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
    status: "Rejected",
    ipAddress: "127.0.0.1",
    device: "Desktop",
    documents: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
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
    ipAddress: "127.0.0.1",
    device: "Desktop",
    documents: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
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
    ipAddress: "127.0.0.1",
    device: "Desktop",
    documents: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
  },
  {
    id: 4,
    user: {
      id: 1,
      name: "reku Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    submitted: "2025-06-11 14:30:25",
    status: "In Progress",
    ipAddress: "127.0.0.1",
    device: "web2.3",
    documents: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
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
