"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileBarChart2,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav/nav-main"
import { NavPortfolios } from "@/components/nav/nav-portfolios"
import { NavHackProjects } from "@/components/nav/nav-hack-projects"
import { NavUser } from "@/components/nav/nav-user"
import { TeamSwitcher } from "@/components/nav/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Jordan Muthemba",
    email: "jordanmuthemba@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "HackSight",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/overview",
        },
        {
          title: "Insights Feed",
          url: "#",
        },
        {
          title: "AI Signals Summary",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics Agents",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Quant Analyst",
          url: "/quant-analyst",
        },
        {
          title: "Fundamental Analyst",
          url: "/fundamental-analyst",
        },
        {
          title: "Sentiment Analyst",
          url: "/sentiment-analyst",
        },
      ],
    },
    {
      title: "Agent Studio",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Run Analysis",
          url: "/run-analysis",
        },
        {
          title: "Agent Playground",
          url: "/agent-playground",
        },
        {
          title: "Prompt Debugger",
          url: "/prompt-debugger",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Scoring Framework",
          url: "#",
        },
        {
          title: "Agent API Usage",
          url: "#",
        },
      ],
    },
    {
      title: "Research Reports",
      url: "#",
      icon: FileBarChart2,
      items: [
        {
          title: "Token Profiles",
          url: "#",
        },
        {
          title: "Market Narratives",
          url: "#",
        },
        {
          title: "Weekly Alpha",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
        { title: "Logout", url: "#" },
      ],
    },
  ],
  portfolios: [
    {
      name: "My Watchlist",
      url: "#",
      icon: Frame,
    },
    {
      name: "Investment Decks",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Export Report",
      url: "#",
      icon: Map,
    },
  ],
  hackProjects: [
    {
      name: "Buildathon Insights",
      url: "#",
      icon: Frame,
    },
    {
      name: "Project Analyzer", 
      url: "#",
      icon: PieChart,
    },
    {
      name: "Submission Review",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavPortfolios projects={data.portfolios} />
        <NavHackProjects projects={data.hackProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
