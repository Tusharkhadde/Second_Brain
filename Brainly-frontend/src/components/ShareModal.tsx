import { useState } from "react";
import { motion } from "framer-motion";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { brainApi } from "@/lib/api";
import { Share2, Copy, Check, Globe, Lock, Loader2, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareModalProps {
    open: boolean;
    onClose: () => void;
}

export function ShareModal({ open, onClose }: ShareModalProps) {
    const [isSharing, setIsSharing] = useState(false);
    const [shareHash, setShareHash] = useState<string | null>(null);
    const [loadingShare, setLoadingShare] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = shareHash
        ? `${window.location.origin}/brain/${shareHash}`
        : null;

    const enableShare = async () => {
        setLoadingShare(true);
        try {
            const res = await brainApi.share(true);
            if (res.data.hash) {
                setShareHash(res.data.hash);
                setIsSharing(true);
            }
        } catch {
            // handle error silently
        } finally {
            setLoadingShare(false);
        }
    };

    const disableShare = async () => {
        setLoadingShare(true);
        try {
            await brainApi.share(false);
            setShareHash(null);
            setIsSharing(false);
        } catch {
            // handle error silently
        } finally {
            setLoadingShare(false);
        }
    };

    const copyLink = () => {
        if (shareUrl) {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share Your Brain</DialogTitle>
                    <DialogDescription>
                        Create a public link to share your curated knowledge with others.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Status indicator */}
                    <div className="flex items-center justify-between p-4 rounded-xl glass border border-white/8">
                        <div className="flex items-center gap-3">
                            {isSharing ? (
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-emerald-400" />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-white/40" />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {isSharing ? "Brain is public" : "Brain is private"}
                                </p>
                                <p className="text-xs text-white/40">
                                    {isSharing ? "Anyone with the link can view" : "Only you can see your content"}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant={isSharing ? "outline" : "default"}
                            size="sm"
                            onClick={isSharing ? disableShare : enableShare}
                            disabled={loadingShare}
                        >
                            {loadingShare ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : isSharing ? (
                                "Disable"
                            ) : (
                                <>
                                    <Share2 className="w-3.5 h-3.5" />
                                    Share
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Share link */}
                    {shareUrl && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                        >
                            <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Share Link</p>
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/4 border border-white/8">
                                <Link2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                                <span className="text-sm text-white/60 truncate flex-1">{shareUrl}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={copyLink}
                                    className={cn(
                                        "h-7 px-2.5 shrink-0 transition-all",
                                        copied ? "text-emerald-400" : "text-white/40 hover:text-white"
                                    )}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
