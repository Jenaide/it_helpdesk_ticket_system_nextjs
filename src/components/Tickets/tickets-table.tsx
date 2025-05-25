
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
                                            ticket.status === "Open"
                                            ? "default"
                                            : ticket.status === "in-Progress"
                                            ? "medium"
                                            : ticket.status === "Resolved"
                                            ? "secondary"
                                            : "outline"
                                        }
                                    >
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        ticket.priority === "high" 
                                        ? "destructive" 
                                        : ticket.priority === "medium" 
                                        ? "medium"
                                        : ticket.priority === "critical"
                                        ? "destructive"
                                        : ticket.priority === "low"
                                        ? "outline" : "default"
                                    }
                                    >
                                        {ticket.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            ticket.category === "Technical"
                                            ? "default"
                                            : ticket.category === "Software"
                                            ? "secondary"
                                            : ticket.category === "Hardware"
                                            ? "secondary"
                                            : ticket.category === "Network"
                                            ? "default"
                                            : ticket.category === "Access"
                                            ? "destructive"
                                            : ticket.category === "Other"
                                            ? "default"
                                            : "outline"
                                        }
                                    >
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>owner</TableCell>
                                <TableCell>{ticket.createdAt.toUTCString()}</TableCell>
                                <TableCell>{ticket.updatedAt.toUTCString()}</TableCell>
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