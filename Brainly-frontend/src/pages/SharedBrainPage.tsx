import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { ContentCard } from "@/components/ContentCard";
import { brainApi, type ContentItem } from "@/lib/api";
import { Brain, Loader2, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SharedBrainPage() {
    const { sharelink } = useParams<{ sharelink: string }>();
    const navigate = useNavigate();
    const [content, setContent] = useState<ContentItem[]>([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!sharelink) return;
        brainApi.getShared(sharelink)
            .then((res) => {
                setUsername(res.data.username);
                setContent(res.data.content);
            })
            .catch(() => setError("This brain doesn't exist or has been made private."))
            .finally(() => setLoading(false));
    }, [sharelink]);

    return (
        <ShaderBackground>
            <div className="fixed top-0 left-0 right-0 z-50">
                <div className="glass border-b border-white/5" style={{ backdropFilter: "blur(24px)" }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold gradient-text">Second Brain</span>
                        </div>
                        <Button size="sm" onClick={() => navigate("/signup")}>
                            Get your own Brain →
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12">
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                    </div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-32 gap-5"
                    >
                        <div className="w-16 h-16 rounded-2xl glass border border-red-500/20 flex items-center justify-center">
                            <AlertCircle className="w-7 h-7 text-red-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-white/70 font-medium">{error}</p>
                            <p className="text-sm text-white/35 mt-1">The link may be invalid or expired.</p>
                        </div>
                        <Button variant="outline" onClick={() => navigate("/signup")}>
                            Create your own Brain
                        </Button>
                    </motion.div>
                ) : (
                    <>
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-700/30 border border-violet-500/30 flex items-center justify-center">
                                    <User className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold gradient-text-white">{username}'s Brain</h1>
                                    <p className="text-sm text-white/40">{content.length} items shared</p>
                                </div>
                                <span className="badge-violet ml-2">Public</span>
                            </div>
                        </motion.div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {content.map((item, i) => (
                                <ContentCard key={item._id} item={item} readOnly index={i} />
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12 flex flex-col items-center gap-3"
                        >
                            <p className="text-sm text-white/30">Want to build your own knowledge base?</p>
                            <Button size="lg" onClick={() => navigate("/signup")}>
                                <Brain className="w-4 h-4" />
                                Create your Second Brain →
                            </Button>
                        </motion.div>
                    </>
                )}
            </div>
        </ShaderBackground>
    );
}
