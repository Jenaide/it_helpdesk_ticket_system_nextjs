import { getTicketById } from "@/actions/ticket.actions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { notFound } from "next/navigation";

interface TicketDetailProps {
    ticketId: string;
}
export async function TicketDetails({ ticketId }: TicketDetailProps) {
    const ticket = await getTicketById(ticketId);
    if (!ticket) {
    notFound();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{ticket.subject}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                        Created by {ticket.id} on {ticket.createdAt.toDateString()}
                    </div>
                    <div className="whitespace-pre-line">
                        {ticket.description}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}