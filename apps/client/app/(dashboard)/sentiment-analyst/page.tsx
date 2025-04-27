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

// 1. Define the Sentiment type
type SentimentResult = {
  platform: string;
  sentiment: string;
  score: number;
  summary: string;
};

// 2. Mock sentiment data
const sentimentData: SentimentResult[] = [
  {
    platform: "Twitter",
    sentiment: "Positive",
    score: 3,
    summary: "Strong bullish tone around new token releases.",
  },
  {
    platform: "Reddit",
    sentiment: "Neutral",
    score: 2,
    summary: "Debate around project valuation with mixed opinions.",
  },
  {
    platform: "Telegram",
    sentiment: "Positive",
    score: 2,
    summary: "Optimism around potential airdrops with slight skepticism.",
  },
  {
    platform: "Farcaster",
    sentiment: "Negative",
    score: 2,
    summary: "Concerns over lack of transparency in the dev team.",
  },
  {
    platform: "News",
    sentiment: "Positive",
    score: 3,
    summary: "Strong VC backing and confidence in long-term viability.",
  },
];

// 3. Columns for the table
const columns: ColumnDef<SentimentResult>[] = [
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => {
      const value = row.getValue("sentiment") as string;
      const color =
        value === "Positive"
          ? "text-green-600"
          : value === "Negative"
          ? "text-red-500"
          : "text-gray-500";
      return <span className={`font-medium ${color}`}>{value}</span>;
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "summary",
    header: "Summary",
  },
  {
    id: "actions",
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.summary)}
            >
              Copy summary
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Investigate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 4. Table component
export default function SentimentAnalystPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: sentimentData,
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Sentiment Analyst</h1>
      <p className="text-muted-foreground mb-6">
        Analyze how different platforms feel about the project.
      </p>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter platform..."
          value={(table.getColumn("platform")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("platform")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
