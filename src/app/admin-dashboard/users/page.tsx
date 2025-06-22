"use client";

import { useState } from "react";
import { DataTable, schema } from "@/components/DataTableAdminUsers";
import { useUserStore, User } from "@/store/userStore";
import { z } from "zod";

const UsersPage = () => {
  const { users } = useUserStore();

  const [tableData] = useState<z.infer<typeof schema>[]>(
    users?.map((user: User) => ({
      id: user.id || "",
      balance: user.balance || 0,
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
      user: {
        id: user.id || "",
        name: user.full_name || "",
        email: user.email || "",
        avatar: user.avatar || "/assets/avatars/avatar-default.png",
        role: user.role || "",
      },
      registered_at: user?.created_at?.split(".")[0] || "",
    })) || []
  );

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Users</h3>
      <div>
        <DataTable data={tableData} />
      </div>
    </div>
  );
};

export default UsersPage;
