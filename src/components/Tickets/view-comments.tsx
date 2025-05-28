import { getCommentsByTicketId } from "@/actions/ticket.actions";


interface ViewCommentProps {
  ticketId: number;
}

export async function ViewComments({ ticketId }: ViewCommentProps) {
    const comments = await getCommentsByTicketId(ticketId.toString());
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.user.role}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
} 