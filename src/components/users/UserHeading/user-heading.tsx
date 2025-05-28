import { getAuthCookie, verifyAuthToken } from "@/lib/auth";
import { getCurrentUser } from "@/lib/current-user";
import { UserHeadingClient } from "./user-heading-client";

export async function UserHeading() {
    try {
        const token = await getAuthCookie();
            if (!token) return null;

            const payload = await verifyAuthToken<{ userId: string; role: string }>(token);
            const user = await getCurrentUser({ userId: payload.userId });

            if (!user) return null;

            return <UserHeadingClient name={user.name ?? "User"} />;
    } catch (error) {
        console.error("Error rendering user heading:", error);
        return null;
    }
}