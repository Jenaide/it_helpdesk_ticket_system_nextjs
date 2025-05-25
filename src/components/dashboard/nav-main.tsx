import { LucideIcon, MailIcon, PlusCircleIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";

export function NavMain({ items }: { items: {title: string; url: string; icon?: LucideIcon}[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton tooltip={"Create Ticket"} className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground">
                            <PlusCircleIcon />
                            <Link href={"/tickets/new"}>
                                <span>Create Ticket</span>
                            </Link>
                        </SidebarMenuButton>
                        <Button size="icon"
                            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                            variant="outline">
                                <MailIcon />
                                <span className="sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <Link href={item.url}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}