import Link from "next/link";
import { MailingListForm } from "./mailing-form";
import { FacebookIcon, Instagram, Linkedin, Twitter} from "lucide-react";


export function MailingList() {
    return (
        <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
            <div className="flex-1 flex flex-col justify-center items-center text-center">
                <div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 ">
                        Sign up for our mailing list while we prepare your account.
                    </h2>
                </div>
                <div>
                    <p className="text-lg sm:text-xl mb-8">
                        Be part of something truly extraordinary. Join thousands of others already gaining early access to latest updates.
                    </p>
                </div>
                <div className="w-full">
                    <MailingListForm />
                </div>
                <div className="pt-8 flex justify-center space-x-6">
                    <Link
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X (formerly Twitter)"
                    ><Twitter className="w-6 h-6" /></Link>
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    ><Instagram className="w-6 h-6" /></Link>
                    <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    ><FacebookIcon className="w-6 h-6" /></Link>
                    <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        ><Linkedin className="w-6 h-6" /></Link>
                </div>
            </div>
        </div>
    )
}