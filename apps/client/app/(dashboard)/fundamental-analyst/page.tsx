// app/fundamental-analyst/page.tsx

"use client";

import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell,TableHead, TableHeader, TableRow,} from "@/components/ui/table";

// 1. Define the type
type FundamentalResult = {
  project: string;
  stage: string;
  backers: string[];
  score: number;
  summary: string;
};

// 2. Mock dataset
const fundamentalData: FundamentalResult[] = [
  {
    project: "ZkVerse",
    stage: "Seed",
    backers: ["a16z", "Paradigm"],
    score: 3,
    summary: "High-profile backers with audited protocol and active devs.",
  },
  {
    project: "ChainBazaar",
    stage: "Series A",
    backers: ["Binance Labs"],
    score: 2,
    summary: "Mid-level backing but lacking governance clarity.",
  },
  {
    project: "MetaStream",
    stage: "Pre-seed",
    backers: [],
    score: 1,
    summary: "No audits or major backers, unproven roadmap.",
  },
];

// 3. Columns
const columns: ColumnDef<FundamentalResult>[] = [
  {
    accessorKey: "project",
    header: "Project",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "backers",
    header: "Backers",
    cell: ({ row }) => {
      const value = row.getValue("backers") as string[];
      return value.length > 0 ? value.join(", ") : "None";
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.getValue("score") as number;
      const color =
        score === 3 ? "text-green-600" : score === 2 ? "text-yellow-500" : "text-red-500";
      return <span className={`font-bold ${color}`}>{score}</span>;
    },
  },
  {
    accessorKey: "summary",
    header: "Summary",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original.project;
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project)}>
              Copy Project Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Research</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 4. Component
export default function FundamentalAnalystPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: fundamentalData,
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
      <h1 className="text-2xl font-bold mb-4">🧠 Fundamental Analyst</h1>
      <p className="text-muted-foreground mb-6">
        View AI-reviewed fundamental metrics for projects.
      </p>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter projects..."
          value={(table.getColumn("project")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("project")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (
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
