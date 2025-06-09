"use client";

// import { Button } from "@/components/ui/button";

// import { DataTable } from "@/components/data-table-support";
// import data from "@/app/data.json";

import { SupportModal } from "@/components/Support";

const Support = () => {
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
      {/* <DataTable data={data} /> */}
    </div>
  );
};

export default Support;
