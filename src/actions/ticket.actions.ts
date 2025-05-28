"use server";

import { getAuthCookie, verifyAuthToken } from "@/lib/auth";
import { prisma } from "@/lib/prismaDB";
import { Category, TicketPriority } from "@prisma/client";
import { revalidatePath } from "next/cache";


interface ActionResponse {
  success: boolean;
  message: string;
}

interface TokenPayload {
  userId: string;
  role: "USER" | "TECHNICIAN" | "ADMINISTRATOR";
}
// Create new tickets
export async function createTicket(prevState: ActionResponse, formData:FormData): Promise<ActionResponse> {
    try {
        const subject = formData.get("subject")?.toString().trim();
        const description = formData.get("description")?.toString().trim();
        const priorityStr = formData.get("priority")?.toString().trim().toUpperCase();
        const categoryStr = formData.get("category")?.toString().trim().toUpperCase();

        if (!subject || !description || !priorityStr || !categoryStr) {
            return { success: false, message: "All fields are required!" }
        }

        // Cast to enums
        const priority = priorityStr as TicketPriority;
        const category = categoryStr as Category;

        const validPriorities: TicketPriority[] = ["LOW", "MEDIUM", "HIGH"];
        const validCategories: Category[] = ["SOFTWARE", "HARDWARE", "NETWORK"];

        if (!validPriorities.includes(priority) || !validCategories.includes(category)) {
        return { success: false, message: "Invalid priority or category." };
        }

        // Get token from cookies and verify it
        const token = await getAuthCookie();
        if (!token) return { success: false, message: "Unauthorized: No token found." };

        const { userId } = await verifyAuthToken<TokenPayload>(token);
        if (!userId) return { success: false, message: "Invalid token." };

        // create ticket
        await prisma.ticket.create({
            data: {
                userId,
                subject,
                description,
                priority,
                category,
            }
        });
        revalidatePath("/tickets")
        return { success: true, message: 'successfully created ticket.' }

    } catch (error) {
        console.error("Error creating ticket:", error);
        return { success: false, message: "An error has occured while creating the ticket." }
    }
}

// Get all tickets
export async function getTickets(){
    try {
        const tickets = await prisma.ticket.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    include: {
                        tickets: {
                            select: {
                                id: true,
                                subject: true,
                                description: true,
                                status: true,
                                priority: true,
                                category: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        }
                    }
                },
            },
        })

        return tickets;
    } catch (error) {
        //await prisma.$disconnect(); // 👈 Disconnect to clear stale prepared statements
        console.error("Error fetching tickets:", error);
        return [];
    }
}

// get ticket by ID
import { cache } from 'react';
export const getTicketById = cache(async(id: string) => {
   try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                user: {
                    include: {
                        tickets: {
                            select: {
                                id: true,
                                subject: true,
                                description: true,
                                status: true,
                                priority: true,
                                category: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        }
                    }
                }
            }
        })

        return ticket
    } catch (error) {
        console.error("Error creating ticket:", error);
        return null;
    } 
});

// create new comment
export async function CreateComment(prevState: ActionResponse, formData:FormData): Promise<ActionResponse> {
    try {
        const content = formData.get("comments")?.toString().trim();
        const ticketId = formData.get("ticketId");

        if (!content || !ticketId || isNaN(Number(ticketId))) {
        return {
            success: false,
            message: "Comment content or ticket ID is missing.",
        };
        }

        // Get token from cookies and verify it
        const token = await getAuthCookie();
        if (!token) return { success: false, message: "Unauthorized: No token found." };

        const { userId } = await verifyAuthToken<TokenPayload>(token);
        if (!userId) return { success: false, message: "Invalid token." };

        // create ticket
        await prisma.comments.create({
            data: {
                content,
                userId,
                ticketId: Number(ticketId),
            }
        });
        revalidatePath(`/tickets/${ticketId}`)
        return { success: true, message: 'Successfully added comment.' }
    } catch (error) {
        console.error("Error creating comment:", error);
        return { success: false, message: "Internal server error." };
    }
}

// get comments by ticket ID
export async function getCommentsByTicketId(ticketId: string) {
    try {
        const comments = await prisma.comments.findMany({
            where: {
                ticketId: Number(ticketId),
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        role: true,
                    }
                }
            }
        });

        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}