import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <img
            src="/vite.svg"
            alt="Second Brain Logo"
            className={cn("w-full h-full object-contain drop-shadow-md", className)}
        />
    );
}
