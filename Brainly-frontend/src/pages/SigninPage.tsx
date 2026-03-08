import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";
import { Brain, Loader2, Sparkles, ArrowRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SigninPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) { setError("Please fill in all fields"); return; }
        setLoading(true);
        setError("");
        try {
            const res = await authApi.signin(username, password);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", username);
            navigate("/dashboard");
        } catch {
            setError("Invalid username or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ShaderBackground className="flex items-center justify-center min-h-screen px-4">
            {/* Decorative orbs */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                {/* Card */}
                <Card className="glass-strong rounded-3xl border border-white/10 glow-violet-sm bg-transparent">
                    {/* Header */}
                    <CardHeader className="flex flex-col items-center pb-2">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mb-4 shadow-xl shadow-violet-900/40 pulse-glow"
                        >
                            <Brain className="w-7 h-7 text-white" />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold gradient-text-white">Welcome back</CardTitle>
                        <CardDescription className="text-sm text-white/45 mt-1">Sign in to your Second Brain</CardDescription>
                    </CardHeader>

                    {/* Form */}
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <Button type="submit" size="lg" disabled={loading} className="w-full mt-2 group">
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex flex-col items-center">
                        <div className="mt-2 text-center">
                            <p className="text-sm text-white/40">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                    Sign up free
                                </Link>
                            </p>
                        </div>

                        {/* Feature hints */}
                        <div className="mt-6 pt-5 w-full border-t border-white/6 flex items-center justify-center gap-1.5 text-xs text-white/25">
                            <Sparkles className="w-3 h-3" />
                            <span>Save anything. Remember everything.</span>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </ShaderBackground>
    );
}
