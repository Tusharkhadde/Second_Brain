import { useState, useRef, type KeyboardEvent } from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contentApi, type ContentType } from "@/lib/api";
import { Twitter, Youtube, Link2, FileText, BookOpen, Loader2, X, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AddContentModalProps {
    open: boolean;
    onClose: () => void;
    onAdded: () => void;
}

const types: { id: ContentType; label: string; icon: React.ComponentType<{ className?: string; size?: number }> }[] = [
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "twitter", label: "Twitter", icon: Twitter },
    { id: "link", label: "Link", icon: Link2 },
    { id: "document", label: "Document", icon: FileText },
    { id: "notion", label: "Notion", icon: BookOpen },
];

export function AddContentModal({ open, onClose, onAdded }: AddContentModalProps) {
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState<ContentType>("link");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const tagInputRef = useRef<HTMLInputElement>(null);

    const addTag = (value: string) => {
        const cleaned = value.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
        if (cleaned && !tags.includes(cleaned) && tags.length < 8) {
            setTags((prev) => [...prev, cleaned]);
        }
        setTagInput("");
    };

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag));
    };

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(tagInput);
        } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
            setTags((prev) => prev.slice(0, -1));
        }
    };

    const handleClose = () => {
        setLink(""); setTitle(""); setType("link");
        setTags([]); setTagInput(""); setError("");
        onClose();
    };

    const handleSubmit = async () => {
        if (!link.trim()) {
            setError("Please enter a URL");
            return;
        }
        // commit any unsaved tag input
        const finalTags = [...tags];
        if (tagInput.trim()) {
            const cleaned = tagInput.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
            if (cleaned && !finalTags.includes(cleaned)) finalTags.push(cleaned);
        }

        setLoading(true);
        setError("");
        try {
            await contentApi.add(
                link.trim(),
                type,
                title.trim() || undefined,
                finalTags.length > 0 ? finalTags : undefined
            );
            handleClose();
            onAdded();
        } catch {
            setError("Failed to add content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add to your Brain</DialogTitle>
                    <DialogDescription>Save any link, tweet, or resource to your second brain.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Type selector */}
                    <div>
                        <Label className="mb-2 block">Content Type</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {types.map((t) => {
                                const Icon = t.icon;
                                return (
                                    <motion.button
                                        key={t.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setType(t.id)}
                                        className={cn(
                                            "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer",
                                            type === t.id
                                                ? "bg-emerald-600/25 border-emerald-500/50 text-emerald-300"
                                                : "bg-white/4 border-white/8 text-white/50 hover:bg-white/8 hover:text-white/70"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" size={16} />
                                        {t.label}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* URL */}
                    <div className="space-y-1.5">
                        <Label htmlFor="url">URL *</Label>
                        <Input
                            id="url"
                            placeholder="https://..."
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label htmlFor="title">Title (optional)</Label>
                        <Input
                            id="title"
                            placeholder="Give this a descriptive title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-1.5">
                        <Label htmlFor="tags" className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-emerald-400" />
                            Tags
                            <span className="text-white/30 font-normal text-xs">(optional · press Enter or , to add)</span>
                        </Label>

                        {/* tag chip container */}
                        <div
                            onClick={() => tagInputRef.current?.focus()}
                            className={cn(
                                "flex flex-wrap gap-1.5 min-h-[42px] px-3 py-2 rounded-xl",
                                "bg-white/4 border border-white/10 cursor-text",
                                "focus-within:border-emerald-500/50 focus-within:bg-white/6 transition-colors"
                            )}
                        >
                            <AnimatePresence>
                                {tags.map((tag) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                                    >
                                        #{tag}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                                            className="text-emerald-400/60 hover:text-emerald-300 transition-colors ml-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </motion.span>
                                ))}
                            </AnimatePresence>

                            <input
                                ref={tagInputRef}
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                onBlur={() => tagInput.trim() && addTag(tagInput)}
                                placeholder={tags.length === 0 ? "e.g. ai, productivity, research" : ""}
                                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-white/70 placeholder:text-white/25"
                                disabled={tags.length >= 8}
                            />
                        </div>

                        {tags.length >= 8 && (
                            <p className="text-xs text-amber-400/70">Maximum 8 tags reached.</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading} className="min-w-[100px]">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
