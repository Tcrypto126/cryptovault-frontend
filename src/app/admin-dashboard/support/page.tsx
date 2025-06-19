"use client";

import { useState } from "react";
import { DataTable } from "@/components/DataTableAdminSupport";
import { useSupportStore } from "@/store/supportStore";

const SupportPage = () => {
  const { supports } = useSupportStore();

  const [tableData, setTableData] = useState<any[]>(
    supports.map((support: any, index: number) => ({
      id: support.id,
      ticketId: `#T-1435${index + 1}`,
      user: {
        id: support.user.id,
        name: support.user.full_name,
        email: support.user.email,
        avatar: support.user.avatar,
      },
      subject: support.subject,
      status:
        support.status === "RESOLVED"
          ? "Resolved"
          : support.status === "ESCALATED"
          ? "Escalated"
          : "In Progress",
      lastUpdated: support.updated_at,
      message: support.message,
      reply: support.replyMessage,
    }))
  );

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Support</h3>
      <div>
        <DataTable data={tableData} />
      </div>
    </div>
  );
};

export default SupportPage;
