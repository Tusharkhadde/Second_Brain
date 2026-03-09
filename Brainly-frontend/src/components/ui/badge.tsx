import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "emerald" | "green" | "yellow" | "red";
}

const variantStyles = {
    default: "bg-white/10 text-white/70 border-white/10",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    yellow: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    red: "bg-red-500/15 text-red-300 border-red-500/30",
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
