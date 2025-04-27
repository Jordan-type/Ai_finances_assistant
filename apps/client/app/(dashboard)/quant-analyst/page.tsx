"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Step 1: Define Quant type
type QuantSignal = {
  asset: string;
  interval: string;
  signal: string;
  confidence: string;
  change: string;
  timestamp: string;
};

// Step 2: Mock Data
const quantData: QuantSignal[] = [
  {
    asset: "ETH/USD",
    interval: "1H",
    signal: "BUY",
    confidence: "High",
    change: "+3.5%",
    timestamp: "2025-04-23 14:00 UTC",
  },
  {
    asset: "BTC/USD",
    interval: "4H",
    signal: "HOLD",
    confidence: "Medium",
    change: "+0.7%",
    timestamp: "2025-04-23 10:00 UTC",
  },
  {
    asset: "SOL/USD",
    interval: "1D",
    signal: "SELL",
    confidence: "Low",
    change: "-1.9%",
    timestamp: "2025-04-22 00:00 UTC",
  },
];

// Step 3: Define columns
export const columns: ColumnDef<QuantSignal>[] = [
  {
    accessorKey: "asset",
    header: "Asset",
    cell: ({ row }) => <span className="font-medium">{row.getValue("asset")}</span>,
  },
  {
    accessorKey: "interval",
    header: "Interval",
  },
  {
    accessorKey: "signal",
    header: "Signal",
    cell: ({ row }) => {
      const value = row.getValue("signal") as string;
      const color =
        value === "BUY"
          ? "text-green-600"
          : value === "SELL"
          ? "text-red-500"
          : "text-gray-500";
      return <span className={`font-semibold ${color}`}>{value}</span>;
    },
  },
  {
    accessorKey: "confidence",
    header: "Confidence",
  },
  {
    accessorKey: "change",
    header: "% Change",
    cell: ({ row }) => {
      const change = row.getValue("change") as string;
      const color = `${String(change).startsWith("-") ? "text-red-500" : "text-green-600"}`;
      return <span className={color}>{String(change)}</span>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.asset)}>
              Copy Asset
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Analyze</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Step 4: Table UI
export function QuantSignalTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: quantData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by asset..."
          value={(table.getColumn("asset")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("asset")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter(c => c.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
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
    </div>
  );
}

export default function QuantAnalystPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Quant Analyst Dashboard</h1>
      <p className="text-muted-foreground mb-6">AI-generated trading signals from the Quant Agent.</p>
      <QuantSignalTable />
    </div>
  );
}

