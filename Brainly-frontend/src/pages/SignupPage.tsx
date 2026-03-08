import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";
import { Brain, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    "Save YouTube videos & tweets",
    "Store links & documents",
    "Share your brain publicly",
];

export function SignupPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) { setError("Please fill in all fields"); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
        setLoading(true);
        setError("");
        try {
            await authApi.signup(username, password);
            setSuccess(true);
            setTimeout(() => navigate("/signin"), 1500);
        } catch {
            setError("Username already taken. Try a different one.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ShaderBackground className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-1/3 left-1/4 w-80 h-80 bg-violet-700/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
                {/* Left — branding */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:block space-y-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center pulse-glow shadow-xl shadow-violet-900/40">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">Second Brain</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white leading-tight">
                        Your personal<br />
                        <span className="gradient-text">knowledge hub</span>
                    </h2>
                    <p className="text-white/50 text-base leading-relaxed">
                        Organize everything you find online into one beautiful, searchable space. Never lose a good link again.
                    </p>
                    <div className="space-y-3">
                        {features.map((f, i) => (
                            <motion.div
                                key={f}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-3 text-white/60"
                            >
                                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                                <span className="text-sm">{f}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right — form */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="glass-strong rounded-3xl border border-white/10 glow-violet-sm bg-transparent">
                        <CardHeader className="mb-3">
                            <CardTitle className="text-2xl font-bold gradient-text-white">Create account</CardTitle>
                            <CardDescription className="text-sm text-white/40 mt-1">Start building your second brain today</CardDescription>
                        </CardHeader>

                        <CardContent>
                            {success ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center py-8 gap-4"
                                >
                                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                        <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                                    </div>
                                    <p className="text-white font-medium">Account created!</p>
                                    <p className="text-sm text-white/40">Redirecting you to sign in...</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            placeholder="Pick a username"
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
                                            placeholder="Min. 6 characters"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="new-password"
                                        />
                                    </div>

                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2"
                                        >
                                            {error}
                                        </motion.p>
                                    )}

                                    <Button type="submit" size="lg" disabled={loading} className="w-full group">
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                Create Account
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>

                        <CardFooter className="flex justify-center mt-2">
                            <p className="text-sm text-white/40">
                                Already have an account?{" "}
                                <Link to="/signin" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </ShaderBackground>
    );
}
