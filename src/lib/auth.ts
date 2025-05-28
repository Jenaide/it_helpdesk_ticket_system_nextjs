import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';


const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = 'auth-token';

// Define the payload type
interface TokenPayload {
    userId: string;
    role: "USER" | "TECHNICIAN" | "ADMINISTRATOR";
}

// Encrypt and sign token
export async function signAuthToken(payload: TokenPayload): Promise<string> {
    try {
        const token = await new SignJWT({ userId: payload.userId, role: payload.role } as JWTPayload)
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret)
        return token;
    } catch (error) {
        console.log(error)
        throw new Error("Token signing failed");
    }
}

// DECRYPT AND VERIFY TOKEN
export async function verifyAuthToken<T>(token:string): Promise<T> {
    try {
        const { payload } = await jwtVerify(token, secret);

        return payload as T;
    } catch (error) {
        console.log(error)
        throw new Error("Token decryption failed");
    }
}

// Set the auth cookie
export async function setAuthCookie(token: string) {
    try {
        const cookieStore = await cookies();
        cookieStore.set(cookieName, token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7days
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to set cookies");
    }
}

// get auth token from cookie
export async function getAuthCookie() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(cookieName)?.value;

        return token;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to get cookies");
    }
}

// remove auth token cookies
export async function removeAuthCookie() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(cookieName);
    } catch (error) {
        console.log(error)
        throw new Error("Failed to get cookies");
    }
}