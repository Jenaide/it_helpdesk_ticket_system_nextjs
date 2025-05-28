import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function MailingListForm() {
    return (
        <form className="w-full space-y-4 mb-8">
            <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-black-500">
                <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full border text-black placeholder:text-black focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
                />
                <Button 
                    type="submit" 
                    
                    className="bg-black hover:bg-gray-800 text-white font-semibold px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none w-[120px]"
                    >
                        Get Notified
                </Button>
            </div>
        </form>
    )
}