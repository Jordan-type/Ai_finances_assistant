"use client"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export type TraderBehaviorSignal = {
  walletCluster: string
  behaviorPattern: string
  activityLevel: "High" | "Medium" | "Low"
  signal: "BUY" | "SELL" | "HOLD"
  confidence: "High" | "Medium" | "Low"
  notes: string
  timestamp: string
}

export const columns: ColumnDef<TraderBehaviorSignal>[] = [
  {
    accessorKey: "walletCluster",
    header: "Wallet Cluster",
    cell: ({ row }) => (
      <span className="font-semibold text-sm">
        {row.getValue("walletCluster")}
      </span>
    ),
  },
  {
    accessorKey: "behaviorPattern",
    header: "Behavior Pattern",
  },
  {
    accessorKey: "signal",
    header: "Signal",
    cell: ({ row }) => {
      const signal = row.getValue("signal") as string
      const color =
        signal === "BUY" ? "green" : signal === "SELL" ? "red" : "gray"
      return (
        <Badge variant="outline" className={`border-${color}-500 text-${color}-600`}>
          {signal}
        </Badge>
      )
    },
  },
  {
    accessorKey: "confidence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Confidence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const confidence = row.getValue("confidence") as string
      const style =
        confidence === "High"
          ? "bg-green-100 text-green-700"
          : confidence === "Medium"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      return <Badge className={style}>{confidence}</Badge>
    },
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("timestamp")}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.walletCluster)}>
              Copy Wallet Cluster
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Wallet Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
