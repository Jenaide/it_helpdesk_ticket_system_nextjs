"use server";

import { setAuthCookie, signAuthToken } from "@/lib/auth";
import { prisma } from "@/lib/prismaDB";
import { Role } from "@prisma/client";
import bcrypt from 'bcryptjs';


type ResponseResulsts = {
    success: boolean;
    message: string;
}
export async function registerUser(prevState: ResponseResulsts, formData: FormData): Promise<ResponseResulsts> {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;


        // Validate role input
        const validRoles: Role[] = ["USER", "TECHNICIAN", "ADMINISTRATOR"];
        const roleInput = (formData.get('role') as string).toUpperCase() as Role;;
        const role: Role = validRoles.includes(roleInput) ? roleInput : "USER"; // Default to 'user' if not provided

        if (!name || !email || !password) {
            return {
                success: false,
                message: 'All fields are required. Please try '
            };
        }
        // check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists with this email.'
            };
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            }
        });

        // sign and set auth token (if applicable)
        const token = await signAuthToken({ userId: user.id, role: user.role });
        await setAuthCookie(token);

        return {
            success: true,
            message: 'Registration successful!'
        };
    } catch (error) {
        console.error('Error during registration:', error);
        return {
            success: false,
            message: 'An error occurred during registration.'
        };
    }
}