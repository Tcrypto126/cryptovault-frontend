"use client";

import { useState } from "react";
import { DataTable } from "@/components/DataTableAdminUsers";
import { useUserStore } from "@/store/userStore";

// import data from "@/app/adminUsersData.json";

const UsersPage = () => {
  const { users } = useUserStore();

  const [tableData, setTableData] = useState<any[]>(
    users?.map((user: any) => ({
      id: user.id,
      balance: user.balance,
      status:
        user.status === "ACTIVE"
          ? "Active"
          : user.status === "INACTIVE"
          ? "Inactive"
          : user.status === "FREEZE"
          ? "Freeze"
          : "Suspended",
      verify: user.verify === "VERIFIED" ? "Verified" : "Unverified",
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        avatar: user.avatar || "/assets/avatars/avatar-default.png",
        role: user.role,
      },
      registered_at: user.created_at.split("T")[0],
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
