"use server";

import { prisma } from "@/lib/prismaDB";
import { revalidatePath } from "next/cache";


interface ActionResponse {
  success: boolean;
  message: string;
}

// Create new tickets
export async function createTicket(prevState: ActionResponse, formData:FormData): Promise<ActionResponse> {
    try {
        const subject = formData.get("subject")?.toString().trim();
        const description = formData.get("description")?.toString().trim();
        const priority = formData.get("priority")?.toString().trim();
        const category = formData.get("category")?.toString().trim();

        if (!subject || !description || !priority || !category) {
            return { success: false, message: "All fields are required!" }
        }

        // create ticket
        await prisma.ticket.create({
            data: {
                subject,
                description,
                priority,
                category
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
            }
        })

        return tickets
    } catch (error) {
        console.error("Error creating ticket:", error);
        return [];
    }
}

// get ticket by ID
export async function getTicketById(id: string) {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: Number(id)
            }
        })

        return ticket
    } catch (error) {
        console.error("Error creating ticket:", error);
        return null;
    }
}