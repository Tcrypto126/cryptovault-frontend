"use client";

import { useState } from "react";
import { DataTable, schema } from "@/components/DataTableAdminKYC";
import { useUserStore } from "@/store/userStore";
import { User } from "@/store/userStore";
import { z } from "zod";

const KYCverification = () => {
  const { users } = useUserStore();

  const [tableData] = useState<z.infer<typeof schema>[]>(
    users?.map((user: User) => ({
      id: user.id || "",
      user: {
        id: user.id || "",
        name: user.full_name || "",
        email: user.email || "",
        avatar: user.avatar || "/assets/avatars/avatar-default.png",
        role: user.role || "",
      },
      submitted: user.updated_at?.split(".")[0].replace("T", " ") || "",
      status:
        user.status === "ACTIVE"
          ? "Active"
          : user.status === "INACTIVE"
          ? "Inactive"
          : user.status === "FREEZE"
          ? "Freeze"
          : "Suspended",
      verify:
        user.verify === "VERIFIED"
          ? "Verified"
          : user.verify === "REJECTED"
          ? "Rejected"
          : "Unverified",
      ipAddress: "192.168.125.1",
      device: "desktop",
      documents: [user.government_id || "", user.id_card || ""],
    })) || []
  );

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3>KYC Submissions</h3>
      </div>
      <div>
        <DataTable data={tableData} />
      </div>
    </div>
  );
};

export default KYCverification;
