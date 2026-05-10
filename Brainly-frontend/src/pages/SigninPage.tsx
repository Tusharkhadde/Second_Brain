import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SigninPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) { setError("Please enter the admin password"); return; }
        setLoading(true);
        setError("");
        try {
            const data = await authApi.signin(password);
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", "admin");
                navigate("/dashboard");
            } else {
                setError("Login failed. No token received.");
            }
        } catch (err: any) {
            console.error("Signin error details:", err);
            const errorMsg = err.response?.data?.message || err.message || "Invalid admin password.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-black relative overflow-hidden">
            {/* Decorative orbs */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-teal-700/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                {/* Card */}
                <Card className="glass-strong rounded-3xl border border-white/10 glow-emerald-sm bg-black/40">
                    {/* Header */}
                    <CardHeader className="flex flex-col items-center pb-2">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center mb-4 shadow-xl shadow-emerald-900/20 pulse-glow"
                        >
                            <Logo className="w-7 h-7 text-white" />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold gradient-text">Admin Access</CardTitle>
                        <CardDescription className="text-sm text-white/40 mt-1">Enter your password to access Second Brain</CardDescription>
                    </CardHeader>

                    {/* Form */}
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="password">Admin Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
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

                            <Button type="submit" size="lg" disabled={loading} className="w-full mt-2 group bg-emerald-600 hover:bg-emerald-500 text-white border-0">
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
                        {/* Feature hints */}
                        <div className="mt-2 pt-5 w-full border-t border-white/5 flex items-center justify-center gap-1.5 text-xs text-white/20">
                            <Sparkles className="w-3 h-3 text-emerald-500/50" />
                            <span>Save anything. Remember everything.</span>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
