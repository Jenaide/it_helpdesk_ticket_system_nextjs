import { prisma } from "./prismaDB";


type AuthPayload = {
    userId: string;
};

export async function getCurrentUser({userId}: AuthPayload) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
            }
        })

        return user;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
};