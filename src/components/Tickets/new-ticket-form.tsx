"use client";

import { useActionState, useEffect } from "react";
import { createTicket } from "@/actions/ticket.actions";
import { LoaderCircle, Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function NewTicketForm(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [state, formAction] = useActionState(createTicket, {
        success: false,
        message: ''
    })

    useEffect(() => {
        if (state.success) {
            toast.success("Ticket submitted successfully!")
            router.push("/tickets")
        }
    }, [state.success, router])
    return (
        <Card>
            <form action={async (formData) => {
                setIsLoading(true);
                formData.set("priority", priority);
                formData.set("category", category);
                await formAction(formData);
                setIsLoading(false)
            }}>
                {
                    state.message && !state.success && (
                        <p className="text-red-500 text-center">{state.message}</p>
                    )
                }
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                            id="subject"
                            name="subject"
                            placeholder="Brief description of the issue"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description"
                            name="description"
                            placeholder="Detailed description of the issue"
                            rows={5}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select onValueChange={setPriority}>
                                <SelectTrigger id="priority">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={setCategory}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="software">Software</SelectItem>
                                    <SelectItem value="hardware">Hardware</SelectItem>
                                    <SelectItem value="network">Network</SelectItem>
                                    <SelectItem value="access">Access/Permission</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="attachments">Attachments (optional)</Label>
                        <div className="flex items-center gap-2">
                            <Button variant={"outline"} type="button" className="gap-2">
                                <Paperclip className="size-4"/> 
                                Add files
                            </Button>
                            <span className="text-sm text-muted-foreground">No files selected</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                    <Button variant={"outline"} type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button className="cursor-pointer" type="submit" disabled={isLoading || !priority || !category}>
                        {isLoading ? <LoaderCircle className="animate-spin"/> : "Create Ticket"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}