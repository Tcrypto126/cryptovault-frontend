"use client";

import { DataTable } from "@/components/DataTableUserSupport";
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
