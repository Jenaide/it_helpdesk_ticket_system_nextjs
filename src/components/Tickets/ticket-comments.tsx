import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { CommentFormClient } from "./comment-form";
import { ViewComments } from "./view-comments";

interface TicketCommentsProps {
  ticketId: string;
}


export async function TicketComments({ ticketId }: TicketCommentsProps) {
    const numericTicketId = Number(ticketId);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Comments</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="space-y-4 bg-muted p-2 rounded-md">
                    <ViewComments ticketId={numericTicketId} />
                </div>
            </CardContent>
            <CardFooter>
                <CommentFormClient ticketId={numericTicketId} />
            </CardFooter> 
        </Card>
    )
}