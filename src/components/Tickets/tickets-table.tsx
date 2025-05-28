
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getTickets } from "@/actions/ticket.actions";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";



export async function TicketsTable() {
    try {
    const tickets = await getTickets();
    //console.log(tickets)
    if (!tickets || tickets.length === 0) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">No Tickets found.</p>
                </CardContent>
            </Card>
        )
    }
    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>priority</TableHead>
                            <TableHead>category</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell className="font-medium">{ticket.id}</TableCell>
                                <TableCell>{ticket.subject}</TableCell>
                                <TableCell className="max-w-xs truncate">{ticket.description}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            ticket.status === "OPEN"
                                            ? "default"
                                            : ticket.status === "IN_PROGRESS"
                                            ? "medium"
                                            : ticket.status === "RESOLVED"
                                            ? "secondary"
                                            : ticket.status === "CLOSED"
                                            ? "outline"
                                            : "default"
                                        }
                                    >
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        ticket.priority === "HIGH"
                                            ? "destructive"
                                            : ticket.priority === "MEDIUM"
                                            ? "medium"
                                            : ticket.priority === "CRITICAL"
                                            ? "destructive"
                                            : ticket.priority === "LOW"
                                            ? "outline"
                                            : "default"
                                        }
                                    >
                                        {ticket.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            ticket.category === "TECHNICAL"
                                                ? "default"
                                                : ticket.category === "SOFTWARE"
                                                ? "secondary"
                                                : ticket.category === "HARDWARE"
                                                ? "secondary"
                                                : ticket.category === "NETWORK"
                                                ? "default"
                                                : ticket.category === "ACCESS"
                                                ? "destructive"
                                                : ticket.category === "OTHER"
                                                ? "default"
                                                : "outline"
                                            }
                                    >
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{ticket.user?.name}</TableCell>
                                <TableCell>{ticket.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>{ticket.updatedAt.toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/tickets/${ticket.id}`}>
                                        <Button variant={"ghost"} size={"sm"}>
                                            view
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
} catch (error) {
    console.error("Error loading tickets:", error);
    return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-destructive">Failed to load tickets.</p>
                </CardContent>
            </Card>
        )
    }
}