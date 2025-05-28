import { TicketsFilter } from "@/components/Tickets/tickets-filter";
import { TicketsTable } from "@/components/Tickets/tickets-table";
import { Separator } from "@/components/ui/separator";
import { UserHeading } from "@/components/users/UserHeading/user-heading";



export default function TicketsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
                <UserHeading />
            </div>
            <Separator />
            <TicketsFilter />
            <TicketsTable />
        </div>

    )
}