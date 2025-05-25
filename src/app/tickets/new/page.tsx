import { NewTicketForm } from "@/components/Tickets/new-ticket-form"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Ticket | AI HelpDesk",
  description: "Create a new support ticket",
}

export default function NewTicketPage(){
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Create New Ticket</h2>
            </div>
            <Separator />
            <div className="p-10">
                <NewTicketForm />
            </div>
        </div>
    )
}