import { getTicketById } from "@/actions/ticket.actions";
import { TicketActions } from "@/components/Tickets/ticket-actions";
import { TicketComments } from "@/components/Tickets/ticket-comments";
import { TicketDetails } from "@/components/Tickets/ticket-details";
import { TicketSidebar } from "@/components/Tickets/ticket-sidebar";
import { ArrowBigLeft } from "lucide-react";
import { Metadata } from "next"
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Ticket Details | HelpDesk Pro",
  description: "View and manage ticket details",
}

interface TicketDetailsProps {
  params: {
    id: string;
  }
}
export default async function TicketDetailsPage({ params }: TicketDetailsProps) {
  const { id } = await params;
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
            {/* Sidebar with ticket metadata and actions */}
            <TicketSidebar ticketId={id}/>
          <div className="space-y-2 md:col-span-3">
            <TicketDetails ticketId={id} />
            <TicketComments ticketId={id} />
          </div>
        </div>
      </div>
  )
}