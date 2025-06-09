"use client";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table-user";

import data from "@/app/data.json";

const Support = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 border border-amber-400">
      <div className="flex justify-between items-center">
        <h3>Support</h3>
        <Button variant="deposit">Need Help?</Button>
      </div>
      <DataTable data={data} />
    </div>
  );
};

export default Support;
