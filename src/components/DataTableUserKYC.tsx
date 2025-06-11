"use client";

import * as React from "react";

import { IconCheck, IconX } from "@tabler/icons-react";
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
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { NavUser } from "./NavUser";
import { KYCapproveModal } from "./KYCapproveModal";

export const schema = z.object({
  id: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
  }),
  submitted: z.string(),
  status: z.string(),
  ipAddress: z.string(),
  device: z.string(),
  documents: z.array(z.string()),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "user",
    header: "Sent to/Received by",
    cell: ({ row }) => (
      <div className="flex items-center justify-start min-w-[160px]">
        <NavUser user={row.original.user} type="table" />
      </div>
    ),
  },
  {
    accessorKey: "submitted",
    header: "Submitted Date",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 ">
          <span>{row.original.submitted}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-0">
        <KYCapproveModal
          id={row.original.id}
          fullName={row.original.user.name}
          email={row.original.user.email}
          dateOfSubmission={row.original.submitted}
          ipAddress={row.original.ipAddress}
          device={row.original.device}
          documents={row.original.documents}
        />

        {row.original.status === "Approved" ? (
          <></>
        ) : (
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
            size="icon"
          >
            <IconCheck color="#1FB356" />
          </Button>
        )}
        {row.original.status === "Approved" ? (
          <></>
        ) : (
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
            size="icon"
          >
            <IconX color="#E62E2E" />
          </Button>
        )}
      </div>
    ),
  },
];

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="rounded-[5px] overflow-auto">
      <Table>
        <TableHeader className="bg-dashboard sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-[#838799] text-left h-11 px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-[#40414933]">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-14"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className="px-4 text-left">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
