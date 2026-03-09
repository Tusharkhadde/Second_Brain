import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-700/40",
                destructive:
                    "bg-red-900/60 text-red-200 hover:bg-red-800/60 border border-red-800/50",
                outline:
                    "border border-white/10 bg-white/5 hover:bg-white/10 text-white hover:border-emerald-500/40",
                secondary:
                    "bg-white/8 text-white hover:bg-white/12 border border-white/10",
                ghost:
                    "hover:bg-white/8 text-white/70 hover:text-white",
                link:
                    "text-emerald-400 underline-offset-4 hover:underline hover:text-emerald-300",
                gradient:
                    "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/30",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-xl px-8 text-base",
                xl: "h-14 rounded-2xl px-10 text-base font-semibold",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
