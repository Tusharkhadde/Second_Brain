import { Brain, Plus, Share2, LogOut, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface NavbarProps {
    onAddContent?: () => void;
    onShare?: () => void;
    username?: string;
}

export function Navbar({ onAddContent, onShare, username }: NavbarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div
                className="glass border-b border-white/5 shadow-lg shadow-black/20"
                style={{ backdropFilter: "blur(24px)" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/dashboard")}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                            <Logo className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="font-bold text-lg gradient-text tracking-tight">
                            Second Brain
                        </span>
                        <span className="badge-emerald hidden sm:inline">Beta</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {username && (
                            <span className="hidden md:flex items-center gap-2 text-sm text-white/50 mr-2">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                {username}
                            </span>
                        )}
                        {onShare && (
                            <Button variant="outline" size="sm" onClick={onShare} className="hidden sm:flex">
                                <Share2 className="w-3.5 h-3.5" />
                                Share Brain
                            </Button>
                        )}
                        {onAddContent && (
                            <Button size="sm" onClick={onAddContent} className="hidden sm:flex">
                                <Plus className="w-3.5 h-3.5" />
                                Add Content
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogout}
                            className="text-white/40 hover:text-red-400 hover:bg-red-500/10"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                        {/* Mobile add button */}
                        {onAddContent && (
                            <Button size="icon" onClick={onAddContent} className="sm:hidden">
                                <Plus className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
