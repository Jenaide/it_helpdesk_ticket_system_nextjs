import { Select } from "@radix-ui/react-select";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import Link from "next/link";

export function TicketsFilter() {
    return (
        <Card>
            <CardContent>
                <div className="flex gap-4 w-full md:flex-row md:items-end">
                    <div className="grid gap-2 md:w-1/4">
                        <Label htmlFor="search">Search</Label>
                        <Input id="search" placeholder="Search tickets..." />
                    </div>
                    <div className="grid gap-2 min-w-[200px] md:w-1/6">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue="all">
                            <SelectTrigger id="status">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 min-w-[200px] md:w-1/6">
                        <Label htmlFor="priority">Priority</Label>
                        <Select defaultValue="all">
                            <SelectTrigger id="status">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 min-w-[200px] md:w-1/6">
                        <Label htmlFor="owner">Owner</Label>
                        <Select defaultValue="all">
                            <SelectTrigger id="status">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="unassigned">unassigned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <Button variant={"ghost"}>Reset</Button>
                        <Button variant={"outline"}>Apply filters</Button>
                        <Link href={"/tickets/new"}>
                            <Button className="gap-1">
                                New Ticket
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}