import { LoginForm } from "@/components/forms/auth/login-form";
import Image from "next/image";

export default function Login() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 gap-6 bg-muted md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-2">
                <div className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Image 
                            src="https://img.freepik.com/premium-photo/close-up-headset-with-microphone-microphone_958138-112143.jpg?w=740" 
                            alt="image" 
                            width={600}
                            height={600} />
                    </div>
                    <span className="tracking-widest">Ai Help Desk</span>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}