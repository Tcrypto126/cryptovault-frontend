"use client";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

import { DataTable } from "@/components/DataTableAdminDeposit";

const data = [
  {
    id: 1,
    name: "5% Welcome Bonus",
    type: "Pop-up",
    bonus: 5,
    active: "May 1 – May 31",
    status: "Active",
  },
  {
    id: 2,
    name: "Lucky Draw Wheel",
    type: "Pop-up",
    bonus: 5,
    active: "May 1 – May 31",
    status: "Active",
  },
  {
    id: 3,
    name: "5% Welcome Bonus",
    type: "Pop-up",
    bonus: 5,
    active: "May 1 – May 31",
    status: "Active",
  },
];

const DepositIncentivesPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3>Deposit Incentives</h3>
        <Button variant="deposit" className="flex items-center gap-2 h-12">
          <IconPlus />
          Create New Incentive
        </Button>
      </div>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default DepositIncentivesPage;
