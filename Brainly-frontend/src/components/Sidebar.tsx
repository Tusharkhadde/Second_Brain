import { cn } from "@/lib/utils";
import { LayoutGrid, Twitter, Youtube, Link2, FileText, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import type { ContentType } from "@/lib/api";

type FilterType = ContentType | "all";

interface SidebarProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    counts?: Partial<Record<FilterType, number>>;
}

const filters: { id: FilterType; label: string; icon: React.ComponentType<{ className?: string; size?: number }> }[] = [
    { id: "all", label: "All Content", icon: LayoutGrid },
    { id: "twitter", label: "Tweets", icon: Twitter },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "link", label: "Links", icon: Link2 },
    { id: "document", label: "Documents", icon: FileText },
    { id: "notion", label: "Notion", icon: BookOpen },
];

export function Sidebar({ activeFilter, onFilterChange, counts = {} }: SidebarProps) {
    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-56 shrink-0 hidden md:flex flex-col gap-1 pt-4"
        >
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3 mb-2">
                Filter
            </p>
            {filters.map((filter, i) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;
                const count = counts[filter.id];

                return (
                    <motion.button
                        key={filter.id}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * i + 0.15 }}
                        onClick={() => onFilterChange(filter.id)}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                            isActive
                                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                                : "text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent"
                        )}
                    >
                        <Icon
                            className={cn(
                                "w-4 h-4 shrink-0",
                                isActive ? "text-violet-400" : "text-white/30"
                            )}
                            size={16}
                        />
                        <span className="flex-1">{filter.label}</span>
                        {count !== undefined && count > 0 && (
                            <span
                                className={cn(
                                    "text-xs px-1.5 py-0.5 rounded-full",
                                    isActive
                                        ? "bg-violet-500/30 text-violet-300"
                                        : "bg-white/8 text-white/40"
                                )}
                            >
                                {count}
                            </span>
                        )}
                    </motion.button>
                );
            })}
        </motion.aside>
    );
}
