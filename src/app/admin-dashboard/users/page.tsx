
import { DataTable } from "@/components/DataTableAdminUsers";

import data from "@/app/adminUsersData.json";

const UsersPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Users</h3>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default UsersPage;
