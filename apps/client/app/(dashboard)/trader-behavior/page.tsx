"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { columns } from "./columns" 
import { type TraderBehaviorSignal } from "./columns"

const behaviorData: TraderBehaviorSignal[] = [
  {
    walletCluster: "Whales",
    activityLevel: "High",
    behaviorPattern: "Accumulation",
    signal: "BUY",
    confidence: "High",
    notes: "Top 5 wallets have been buying aggressively in the last 24h",
    timestamp: "2024-06-01T10:00:00Z",
  },
  {
    walletCluster: "Retail",
    activityLevel: "Medium",
    behaviorPattern: "Distribution",
    signal: "SELL",
    confidence: "Medium",
    notes: "Spike in small wallet sell-offs after news drop",
    timestamp: "2024-06-01T11:00:00Z",
  },
  {
    walletCluster: "Smart Money",
    activityLevel: "Low",
    behaviorPattern: "Sidelined",
    signal: "HOLD",
    confidence: "Low",
    notes: "No significant moves; watching the market",
    timestamp: "2024-06-01T12:00:00Z",
  },
]

export default function TraderBehaviorPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: behaviorData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Trader Behavior Analyst</h1>
      <p className="text-muted-foreground mb-6">
        AI-powered analysis of on-chain trading patterns to predict market behavior.
      </p>

      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter clusters..."
          value={(table.getColumn("walletCluster")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("walletCluster")?.setFilterValue(e.target.value)
          }
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
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
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
                <TableRow key={row.id}>
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
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
