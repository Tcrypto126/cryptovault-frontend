"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLoader,
  IconSearch,
} from "@tabler/icons-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpIcon, ArrowDownIcon } from "./ui/icon";
import StatusBadge from "./StatusBadge";
import { NavUser } from "./NavUser";

export const schema = z.object({
  id: z.number(),
  timestamp: z.string(),
  type: z.enum(["Deposit", "Withdraw", "BonusSent", "BonusReceived"]),
  status: z.string(),
  amount: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
  }),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 min-w-[160px]">
          <span className="text-muted-foreground">
            {row.original.timestamp}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-1 min-w-[200px]">
        {row.original.user.email}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-1 min-w-[120px]">
        {row.original.type === "Deposit" ? (
          <>
            <ArrowDownIcon width="24" height="24" />
            Deposit
          </>
        ) : row.original.type === "Withdraw" ? (
          <>
            <ArrowUpIcon width="24" height="24" />
            Withdraw
          </>
        ) : row.original.type === "BonusSent" ? (
          <>
            <ArrowUpIcon width="24" height="24" />
            Bonus
          </>
        ) : row.original.type === "BonusReceived" ? (
          <>
            <ArrowDownIcon width="24" height="24" />
            Bonus
          </>
        ) : (
          <IconLoader />
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start min-w-[90px]">
          ${row.original.amount}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center justify-start min-w-[90px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center justify-start min-w-[140px]">
        <NavUser user={row.original.user} type="table" />
      </div>
    ),
  },
];

// ... rest of the component code ...
