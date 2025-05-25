"use client";

import { CheckCircle, ChevronDown, Clock, MoreHorizontal, Trash, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface TicketActionsProps {
    ticketId: string;
}
export function TicketActions({ ticketId }: TicketActionsProps) {
    const handleStatusChange = (status) => {
    // In a real app, this would update the ticket status via API
        console.log(`Changing ticket ${ticketId} status to ${status}`)
    }

    const handleAssign = () => {
        // In a real app, this would open a modal to assign the ticket
        console.log(`Assigning ticket ${ticketId}`)
    }

    const handleDelete = () => {
        // In a real app, this would open a confirmation dialog
        console.log(`Deleting ticket ${ticketId}`)
    }
    return (
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} className="gap-1">
                        Change status
                        <ChevronDown className="size-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleStatusChange("open")}>
                        <Clock className="mr-2 size-4"/>
                        <span>Open</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("in-progress")}>
                        <Clock className="mr-2 size-4"/>
                        <span>In progress</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("resolved")}>
                        <CheckCircle className="mr-2 size-4"/>
                        <span>Resolved</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("closed")}>
                        <CheckCircle className="mr-2 size-4"/>
                        <span>Closed</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={"outline"} className="gap-1" onClick={handleAssign}>
                <UserPlus className="mr-1 size-4"/>
                <span>Assign</span>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDelete}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete Ticket</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}