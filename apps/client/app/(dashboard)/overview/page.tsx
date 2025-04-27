"use client"

import * as React from "react"
import Link from "next/link"
import { Bot, LineChart, Network, Radar, ScrollText, TrendingUp, } from "lucide-react"


import { AppSidebar } from "@/components/nav/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const tiles = [
  { title: "Quant Analyst", icon: <LineChart />, href: "/quant-analyst" },
  { title: "Sentiment Analyst", icon: <Radar />, href: "/sentiment-analyst" },
  { title: "Fundamental Analyst", icon: <ScrollText />, href: "/fundamental-analyst" },
  { title: "Signals", icon: <TrendingUp />, href: "/signals" },
  { title: "Projects", icon: <Network />, href: "/projects" },
  { title: "Agent Playground", icon: <Bot />, href: "/agent-playground" },
]

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold mb-4">Good afternoon, Jordan 👋</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tiles.map((tile) => (
          <Link key={tile.title} href={tile.href}>
            <Card className="hover:shadow-lg hover:bg-muted/20 transition-all cursor-pointer">
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <div className="text-primary text-3xl">{tile.icon}</div>
                <CardTitle>{tile.title}</CardTitle>
                <CardDescription>Open {tile.title} dashboard</CardDescription>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
