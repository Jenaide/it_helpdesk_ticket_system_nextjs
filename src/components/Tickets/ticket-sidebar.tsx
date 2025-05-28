import { getTicketById } from "@/actions/ticket.actions";
import { notFound } from "next/navigation";


interface TicketSidebarProps {
    ticketId: string;
}

export async function TicketSidebar({ ticketId }: TicketSidebarProps) {
    const ticket = await getTicketById(ticketId);
        if (!ticket) {
        notFound();
        }
    
    return (
        <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Ticket Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{ticket.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  <span className="font-medium">{ticket.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{ticket.createdAt.toUTCString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="font-medium">{ticket.updatedAt.toUTCString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assigned to:</span>
                  <span className="font-medium">{ticket.user.name}</span>
                </div>
              </div>
            </div>
        </div>
    )
}