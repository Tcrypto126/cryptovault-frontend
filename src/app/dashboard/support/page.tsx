"use client";

import { DataTable } from "@/components/DataTableUserSupport";

// const data = [
//   {
//     id: 1,
//     ticketId: "#T-14352",
//     user: {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//     },
//     subject: "Withdrawal Delay",
//     status: "Resolved",
//     lastUpdated: "2025-06-11 14:30:25",
//     message:
//       "I'm sorry to inform you that the withdrawal is delayed due to some technical issues. We are working on it and will update you as soon as possible.",
//   },
//   {
//     id: 2,
//     ticketId: "#T-14353",
//     user: {
//       id: 1,
//       name: "kaori Doe",
//       email: "fujio.doe@example.com",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//     },
//     subject: "Bonus not received",
//     status: "In Progress",
//     lastUpdated: "2025-06-11 14:30:25",
//     message:
//       "I'm sorry to inform you that the withdrawal is delayed due to some technical issues. We are working on it and will update you as soon as possible.",
//   },
//   {
//     id: 3,
//     ticketId: "#T-14354",
//     user: {
//       id: 1,
//       name: "maksyme kolesov",
//       email: "fujio.doe@example.com",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//     },
//     subject: "Bonus not received",
//     status: "Escalated",
//     lastUpdated: "2025-06-11 14:30:25",
//     message:
//       "I'm sorry to inform you that the withdrawal is delayed due to some technical issues. We are working on it and will update you as soon as possible.",
//   },
// ];

import { useEffect, useState } from "react";
import { SupportModal } from "@/components/Support";
import { useSupportStore } from "@/store";

const SupportPage = () => {
  const { supports } = useSupportStore();
  const [tableData, setTableData] = useState<any[]>(supports);

  useEffect(() => {
    setTableData(supports);
  }, [supports]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h3>Support</h3>
        <SupportModal />
      </div>
      <h5>
        If you're experiencing an issue or have any questions about your
        account, transactions, or bonuses — we're just a message away.
      </h5>
      <DataTable data={tableData} />
    </div>
  );
};

export default SupportPage;
