"use client";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

import { NewDepositIncentiveModal } from "@/components/NewDepositIncentiveModal";
import { DataTable } from "@/components/DataTableAdminDeposit";

const data = [
  {
    id: 1,
    name: "5% Welcome Bonus",
    type: "popup",
    bonus: "5%",
    active: "2025-06-05T15:00:00.000Z",
    status: "Active",
  },
  {
    id: 2,
    name: "Lucky Draw Wheel",
    type: "popup",
    bonus: "5%",
    active: "2025-06-05T15:00:00.000Z",
    status: "Active",
  },
  {
    id: 3,
    name: "5% Welcome Bonus",
    type: "direct-deposit",
    bonus: "$100",
    active: "2025-06-05T15:00:00.000Z",
    status: "Active",
  },
];

const DepositIncentivesPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3>Deposit Incentives</h3>
        <NewDepositIncentiveModal />
      </div>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default DepositIncentivesPage;
