import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ExternalLink, Twitter, Youtube, Link2, FileText, BookOpen, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/lib/api";

interface ContentCardProps {
    item: ContentItem;
    onDelete?: (id: string) => void;
    readOnly?: boolean;
    index?: number;
}

const typeConfig = {
    twitter: {
        icon: Twitter,
        label: "Tweet",
        color: "text-sky-400",
        badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
        gradient: "from-sky-500/10 to-transparent",
    },
    youtube: {
        icon: Youtube,
        label: "YouTube",
        color: "text-red-400",
        badge: "bg-red-500/15 text-red-300 border-red-500/30",
        gradient: "from-red-500/10 to-transparent",
    },
    link: {
        icon: Link2,
        label: "Link",
        color: "text-emerald-400",
        badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        gradient: "from-emerald-500/10 to-transparent",
    },
    document: {
        icon: FileText,
        label: "Document",
        color: "text-amber-400",
        badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        gradient: "from-amber-500/10 to-transparent",
    },
    notion: {
        icon: BookOpen,
        label: "Notion",
        color: "text-gray-400",
        badge: "bg-gray-500/15 text-gray-300 border-gray-500/30",
        gradient: "from-gray-500/10 to-transparent",
    },
};

function getYoutubeId(url: string) {
    const patterns = [
        /(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/,
        /^([A-Za-z0-9_-]{11})$/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function getTweetId(url: string) {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
}

export function ContentCard({ item, onDelete, readOnly = false, index = 0 }: ContentCardProps) {
    const [copied, setCopied] = useState(false);
    const config = typeConfig[item.type] || typeConfig.link;
    const Icon = config.icon;

    const youtubeId = item.type === "youtube" ? getYoutubeId(item.link) : null;
    const tweetId = item.type === "twitter" ? getTweetId(item.link) : null;

    const copyLink = () => {
        navigator.clipboard.writeText(item.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace("www.", "");
        } catch {
            return url;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
            className="group relative card-hover"
        >
            <div
                className={cn(
                    "relative overflow-hidden rounded-2xl glass border border-white/8",
                    "hover:border-emerald-500/25 transition-all duration-300"
                )}
            >
                {/* Top gradient accent */}
                <div className={cn("absolute top-0 left-0 right-0 h-px bg-gradient-to-r", config.gradient, "to-transparent opacity-60")} />

                {/* Card header */}
                <div className="flex items-start justify-between p-4 pb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div
                            className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                "bg-white/5 border border-white/8"
                            )}
                        >
                            <Icon className={cn("w-4 h-4", config.color)} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-white/40 truncate">{getDomain(item.link)}</p>
                            {item.title && (
                                <p className="text-sm font-medium text-white/85 truncate mt-0.5 max-w-[200px]">
                                    {item.title}
                                </p>
                            )}
                        </div>
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ml-2", config.badge)}>
                        {config.label}
                    </span>
                </div>

                {/* Embed area */}
                {youtubeId && (
                    <div className="mx-4 mb-3 rounded-xl overflow-hidden bg-black/30 aspect-video">
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                )}

                {tweetId && (
                    <div className="mx-4 mb-3 rounded-xl overflow-hidden bg-black/20 border border-white/5 p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Twitter className="w-4 h-4 text-sky-400" />
                            <span className="text-xs text-sky-400 font-medium">Twitter / X</span>
                        </div>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                            View tweet →
                        </a>
                    </div>
                )}

                {!youtubeId && !tweetId && (
                    <div className="mx-4 mb-3 px-3 py-2.5 rounded-xl bg-white/3 border border-white/6">
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("text-sm truncate block transition-colors hover:text-emerald-300", config.color)}
                        >
                            {item.link.length > 60 ? item.link.slice(0, 60) + "..." : item.link}
                        </a>
                    </div>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 px-4 pb-2.5">
                        {item.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-600/15 border border-emerald-500/25 text-emerald-300/80 text-[11px] font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyLink}
                            className="h-7 w-7 text-white/30 hover:text-white/70"
                        >
                            <Copy className="w-3.5 h-3.5" />
                        </Button>
                        {copied && <span className="text-xs text-emerald-400 animate-pulse">Copied!</span>}
                    </div>
                    <div className="flex items-center gap-1">
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-white/30 hover:text-emerald-400">
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                        </a>
                        {!readOnly && onDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-white/30 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                onClick={() => onDelete(item._id)}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
