import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ContentCard } from "@/components/ContentCard";
import { AddContentModal } from "@/components/AddContentModal";
import { ShareModal } from "@/components/ShareModal";
import { contentApi, type ContentItem, type ContentType } from "@/lib/api";
import { Plus, Brain, Search, Loader2, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FilterType = ContentType | "all";

export function DashboardPage() {
    const navigate = useNavigate();
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [filter, setFilter] = useState<FilterType>("all");
    const [search, setSearch] = useState("");
    const username = localStorage.getItem("username") || undefined;

    // Auth guard
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/signin");
    }, [navigate]);

    const fetchContent = async () => {
        try {
            const res = await contentApi.getAll();
            setContent(res.data.content);
        } catch {
            navigate("/signin");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContent(); }, []);

    const handleDelete = async (id: string) => {
        try {
            await contentApi.delete(id);
            setContent((prev) => prev.filter((c) => c._id !== id));
        } catch {
            // silently fail
        }
    };

    // Filter + search
    const filtered = useMemo(() => {
        let items = content;
        if (filter !== "all") items = items.filter((c) => c.type === filter);
        if (search.trim()) {
            const q = search.toLowerCase();
            items = items.filter(
                (c) =>
                    c.link.toLowerCase().includes(q) ||
                    (c.title && c.title.toLowerCase().includes(q))
            );
        }
        return items;
    }, [content, filter, search]);

    // Count per type
    const counts = useMemo(() => {
        const map: Partial<Record<FilterType, number>> = { all: content.length };
        for (const item of content) {
            map[item.type] = (map[item.type] || 0) + 1;
        }
        return map;
    }, [content]);

    return (
        <ShaderBackground>
            <Navbar
                onAddContent={() => setAddOpen(true)}
                onShare={() => setShareOpen(true)}
                username={username}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
                {/* Welcome banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <h2 className="text-xl font-semibold text-white/80">
                        {username ? `${username}'s Brain` : "Your Brain"}
                    </h2>
                    <p className="text-sm text-white/35 mt-0.5">
                        {content.length} items saved
                    </p>
                </motion.div>

                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="relative mb-6"
                >
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <Input
                        placeholder="Search your content..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-9 h-11"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </motion.div>

                {/* Main layout */}
                <div className="flex gap-6">
                    <Sidebar activeFilter={filter} onFilterChange={setFilter} counts={counts} />

                    {/* Content grid */}
                    <div className="flex-1 min-w-0">
                        {loading ? (
                            <div className="flex items-center justify-center py-32">
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                                    <p className="text-sm text-white/40">Loading your brain...</p>
                                </div>
                            </div>
                        ) : filtered.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-32 gap-5"
                            >
                                <div className="w-20 h-20 rounded-3xl glass border border-white/10 flex items-center justify-center float">
                                    <Logo className="w-9 h-9 text-emerald-400/60" />
                                </div>
                                <div className="text-center">
                                    <p className="text-white/50 font-medium">
                                        {search ? "No results found" : filter !== "all" ? `No ${filter} content yet` : "Your brain is empty"}
                                    </p>
                                    <p className="text-sm text-white/25 mt-1">
                                        {!search && "Add your first piece of content to get started"}
                                    </p>
                                </div>
                                {!search && (
                                    <Button onClick={() => setAddOpen(true)}>
                                        <Plus className="w-4 h-4" />
                                        Add Content
                                    </Button>
                                )}
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((item, i) => (
                                        <ContentCard
                                            key={item._id}
                                            item={item}
                                            onDelete={handleDelete}
                                            index={i}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile FAB */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAddOpen(true)}
                className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-900/50 pulse-glow z-40"
            >
                <Plus className="w-6 h-6 text-white" />
            </motion.button>

            <AddContentModal open={addOpen} onClose={() => setAddOpen(false)} onAdded={fetchContent} />
            <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
        </ShaderBackground>
    );
}
