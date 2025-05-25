import { getTicketById } from "@/actions/ticket.actions";
import { TicketActions } from "@/components/Tickets/ticket-actions";
import { TicketComments } from "@/components/Tickets/ticket-comments";
import { TicketDetails } from "@/components/Tickets/ticket-details";
import { ArrowBigLeft } from "lucide-react";
import { Metadata } from "next"
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Ticket Details | HelpDesk Pro",
  description: "View and manage ticket details",
}

interface TicketDetailsProps {
  id: string;
}
export default async function TicketDetailsPage( props: { params: Promise<TicketDetailsProps> }){
  const { id } = await props.params;
  const ticket = await getTicketById(id);
  if (!ticket) {
    notFound();
  }

  return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Link href={"/tickets"}>
            <ArrowBigLeft className="size-6"/>
          </Link>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Ticket # {id}</h2>
          <TicketActions ticketId={id} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 md:col-span-3">
            <TicketDetails ticketId={id} />
            <TicketComments ticketId={id} />
          </div>
          <div>
            {/* Sidebar with ticket metadata and actions */}
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
                    <span className="font-medium">John Smith</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}