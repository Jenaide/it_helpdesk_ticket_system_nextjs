"use client";

import { registerUser } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("user");
    const router = useRouter();

    const initialState = {
        success: false,
        message: "",
    }
    const [state, formAction] = useActionState(registerUser, initialState);

    useEffect(() => {
        setIsLoading(false);
        if (state.success) {
            toast.success("Registration successful! Redirecting ...");
            // role-based redirection
            if (role === "USER") {
                router.push("/tickets");
            } else if (role === "TECHNICIAN" || role === "ADMINISTRATOR") {
                router.push("/verification");
            }
            router.refresh();
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state,role, router]);
    return (
        <div className="flex flex-col">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome</CardTitle>
                    <CardDescription>
                        Sign up in with your Google or Facebook account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={async (formData) => {
                        setIsLoading(true);
                        await formAction(formData)
                    }}>
                        <div className="grid gap-4">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full">
                                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" ></g>
                                        <g id="SVGRepo_tracerCarrier"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z">
                                            </path></g>
                                    </svg>
                                    Sign up with FaceBook
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                        />
                                    </svg>
                                    Sign up with Google
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Name</Label>
                                    <Input 
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="example@example.co.za"
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        name="password"
                                        autoComplete="new-password" 
                                        placeholder="**********" 
                                        required 
                                    />
                                </div>
                               <div className="flex gap-3">
                                    <Label htmlFor="role">Role</Label>
                                    <Input type="hidden" name="role" value={role} />
                                    <Select value={role} onValueChange={setRole}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USER">User</SelectItem>
                                            <SelectItem value="TECHNICIAN">Technician</SelectItem>
                                            <SelectItem value="ADMINISTRATOR">Administrator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground mt-1">Note: Admin and technician roles require approval</p>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign up"}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Have an account?{" "}
                                <Link href={"/signup"} className="text-sm underline-offset-4 hover:underline">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                By clicking sign up, you agree to our <Link href={"#"}>Terms of Service</Link>{" "}
                and <Link href={"#"}>Privacy Policy</Link>
            </div>
        </div>
    )
}