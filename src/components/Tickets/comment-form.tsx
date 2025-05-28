"use client";

import { useActionState, useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CreateComment } from "@/actions/ticket.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface CommentFormProps {
  ticketId: number;
}
export function CommentFormClient({ ticketId }: CommentFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(CreateComment, {
        success: false,
        message: ''
    })
    
    useEffect(() => {
        if (state.success) {
            toast.success("Comment submitted successfully!");
            // Defer router.refresh() to avoid blocking render
            startTransition(() => {
                router.refresh();
            });
        }
    }, [state.success, router])

    return (
        <form action={formAction} className="space-y-2">
            <input type="hidden" name="ticketId" value={ticketId} />
            <Textarea
                name="comments"
                placeholder="Add a comment..."
                className=" min-w-[90vw]"
            />
            
            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending? "Submitting..." : "Add Comment"}
                </Button>
            </div>
        </form>
    )
}