"use client";

import { useState } from "react";
import { DataTable, schema } from "@/components/DataTableAdminSupport";
import { useSupportStore, Support } from "@/store/supportStore";
import { z } from "zod";

const SupportPage = () => {
  const { allSupports } = useSupportStore();

  const [tableData] = useState<z.infer<typeof schema>[]>(
    allSupports.map((support: Support, index: number) => ({
      id: support.id || "",
      ticketId: `#T-1435${index + 1}`,
      user: {
        id: support?.user?.id || "",
        name: support?.user?.full_name || "",
        email: support?.user?.email || "",
        avatar: support?.user?.avatar || "",
      },
      subject: support.subject || "",
      status:
        support.status === "RESOLVED"
          ? "Resolved"
          : support.status === "ESCALATED"
          ? "Escalated"
          : "In Progress",
      lastUpdated: support?.updated_at?.split(".")[0].replace("T", " ") || "",
      message: support.message || "",
      reply: support.replyMessage || "",
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
