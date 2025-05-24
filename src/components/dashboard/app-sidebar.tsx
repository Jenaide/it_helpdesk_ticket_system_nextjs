"use client";

import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
    ArrowUpCircleIcon,
    BarChartIcon,
    CameraIcon,
    ChartBar,
    ClipboardListIcon,
    DatabaseIcon,
    FileCodeIcon,
    FileIcon,
    FileTextIcon,
    FolderCheckIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    SettingsIcon,
    TicketCheckIcon,
    Users,
  } from "lucide-react"
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
    user: {
      name: "Jenaide Sibolie",
      email: "jenaidesibolie@gmail.com",
      avatar: "https://img.freepik.com/premium-photo/futuristic-female-character-hyperrealistic-3d-style-dressed-spaceinspired-fashion_549857-10880.jpg?w=740",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Tickets",
        url: "#",
        icon: TicketCheckIcon,
      },
      {
        title: "Reports",
        url: "#",
        icon: BarChartIcon,
      },
      {
        title: "Users",
        url: "#",
        icon: Users,
      },
      {
        title: "Projects",
        url: "#",
        icon: FolderCheckIcon,
      },
      {
        title: "Analytics",
        url: "#",
        icon: ChartBar,
      },
      {
        title: "Settings",
        url: "#",
        icon: SettingsIcon,
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: CameraIcon,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: FileTextIcon,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: FileCodeIcon,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: SettingsIcon,
      },
      {
        title: "Get Help",
        url: "#",
        icon: HelpCircleIcon,
      },
    ],
    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: DatabaseIcon,
      },
      {
        name: "Reports",
        url: "#",
        icon: ClipboardListIcon,
      },
      {
        name: "Word Assistant",
        url: "#",
        icon: FileIcon,
      },
    ],
  }
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>){
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href={"/dashboard"}>
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold tracking-widest">AI Helpdesk</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
              <NavUser user={data.user}/>
            </SidebarFooter>
        </Sidebar>
    )
}