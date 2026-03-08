import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { Button } from "@/components/ui/button";
import {
    Brain,
    Youtube,
    Twitter,
    Link2,
    FileText,
    Share2,
    Search,
    Sparkles,
    ArrowRight,
    Check,
    Zap,
    Shield,
    Globe,
    ChevronDown,
} from "lucide-react";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
    }),
};

function InView({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const features = [
    {
        icon: Youtube,
        title: "YouTube Videos",
        desc: "Save your favorite videos with automatic thumbnails and embeds.",
        color: "from-red-500/20 to-red-600/5",
        border: "border-red-500/20",
        iconColor: "text-red-400",
    },
    {
        icon: Twitter,
        title: "Tweets & Threads",
        desc: "Capture insightful tweets before they disappear forever.",
        color: "from-sky-500/20 to-sky-600/5",
        border: "border-sky-500/20",
        iconColor: "text-sky-400",
    },
    {
        icon: Link2,
        title: "Web Links",
        desc: "Bookmark any URL with rich previews and custom titles.",
        color: "from-violet-500/20 to-violet-600/5",
        border: "border-violet-500/20",
        iconColor: "text-violet-400",
    },
    {
        icon: FileText,
        title: "Documents & Notes",
        desc: "Store documents, notes, Notion pages, and more in one place.",
        color: "from-emerald-500/20 to-emerald-600/5",
        border: "border-emerald-500/20",
        iconColor: "text-emerald-400",
    },
    {
        icon: Share2,
        title: "Share Your Brain",
        desc: "Generate a public link to share your curated collection with anyone.",
        color: "from-pink-500/20 to-pink-600/5",
        border: "border-pink-500/20",
        iconColor: "text-pink-400",
    },
    {
        icon: Search,
        title: "Instant Search",
        desc: "Find anything instantly with full-text search across all your content.",
        color: "from-amber-500/20 to-amber-600/5",
        border: "border-amber-500/20",
        iconColor: "text-amber-400",
    },
];

const steps = [
    { num: "01", title: "Create your account", desc: "Sign up for free in seconds — no credit card required." },
    { num: "02", title: "Save what matters", desc: "Add videos, tweets, links, or documents with one click." },
    { num: "03", title: "Organize & search", desc: "Filter by type and search instantly across everything you've saved." },
    { num: "04", title: "Share your brain", desc: "Generate a public link and share your curated knowledge with the world." },
];

const benefits = [
    { icon: Zap, text: "Lightning fast" },
    { icon: Shield, text: "Secure & private" },
    { icon: Globe, text: "Access anywhere" },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function LandingNav() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between mx-auto max-w-6xl px-6 py-4"
        >
            <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40 pulse-glow">
                    <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">Second Brain</span>
            </div>



            <div className="flex items-center gap-3">
                <Link to="/signin">
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                        Sign In
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button size="sm" className="group">
                        Get Started
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                </Link>
            </div>
        </motion.nav>
    );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-700/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-fuchsia-700/8 rounded-full blur-[90px]" />
            </div>

            <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="badge-violet mb-6 inline-flex items-center gap-1.5"
            >
                <Sparkles className="w-3 h-3" />
                Your personal knowledge hub
            </motion.div>

            <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-5xl sm:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]"
            >
                Save everything.{" "}
                <span className="gradient-text">Forget nothing.</span>
            </motion.h1>

            <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-6 text-lg sm:text-xl text-white/50 max-w-xl leading-relaxed"
            >
                Second Brain is your digital memory — save YouTube videos, tweets, links
                and documents in one beautiful, searchable space.
            </motion.p>

            <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
                <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto group px-8 text-base">
                        Start for free
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
                <Link to="/signin">
                    <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white/60 hover:text-white text-base">
                        Sign in →
                    </Button>
                </Link>
            </motion.div>

            {/* Benefits row */}
            <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-10 flex items-center gap-6 text-sm text-white/35"
            >
                {benefits.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-violet-400" />
                        {text}
                    </div>
                ))}
            </motion.div>

            {/* Floating card preview */}
            <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-16 w-full max-w-3xl"
            >
                <div className="glass-strong rounded-3xl p-5 border border-white/10 glow-violet-sm overflow-hidden relative">
                    {/* Mock header */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                        </div>
                        <div className="flex-1 h-5 bg-white/5 rounded-lg mx-2" />
                    </div>
                    {/* Mock cards */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { tag: "YouTube", c: "from-red-500/15 to-red-600/5", tc: "text-red-400" },
                            { tag: "Tweet", c: "from-sky-500/15 to-sky-600/5", tc: "text-sky-400" },
                            { tag: "Link", c: "from-violet-500/15 to-violet-600/5", tc: "text-violet-400" },
                        ].map(({ tag, c, tc }) => (
                            <div key={tag} className={`rounded-xl p-3 bg-gradient-to-br ${c} border border-white/8`}>
                                <div className={`text-[10px] font-semibold ${tc} mb-2`}>{tag}</div>
                                <div className="h-2 bg-white/10 rounded mb-1.5" />
                                <div className="h-2 bg-white/6 rounded w-3/4" />
                                <div className="h-12 bg-white/4 rounded-lg mt-3" />
                            </div>
                        ))}
                    </div>
                    {/* Shimmer overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-10 text-white/20"
            >
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
    return (
        <section className="py-24 px-6 relative">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
            <div className="max-w-6xl mx-auto">
                <InView className="text-center mb-16">
                    <motion.div variants={fadeUp} custom={0} className="badge-violet mb-4 inline-flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Everything in one place
                    </motion.div>
                    <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white">
                        Save any type of content
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2} className="mt-4 text-white/45 text-lg max-w-xl mx-auto">
                        From YouTube to tweets to docs — Second Brain handles it all.
                    </motion.p>
                </InView>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map(({ icon: Icon, title, desc, color, border, iconColor }, i) => (
                        <InView key={title}>
                            <motion.div
                                variants={fadeUp}
                                custom={i * 0.05}
                                className={`glass rounded-2xl p-6 border ${border} card-hover bg-gradient-to-br ${color} h-full`}
                            >
                                <div className={`w-11 h-11 rounded-xl glass flex items-center justify-center mb-4 ${border}`}>
                                    <Icon className={`w-5 h-5 ${iconColor}`} />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{title}</h3>
                                <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
                            </motion.div>
                        </InView>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-800/8 rounded-full blur-[150px]" />
            <div className="max-w-5xl mx-auto">
                <InView className="text-center mb-16">
                    <motion.div variants={fadeUp} custom={0} className="badge-violet mb-4 inline-flex items-center gap-1.5">
                        <Zap className="w-3 h-3" /> Simple by design
                    </motion.div>
                    <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white">
                        How it works
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2} className="mt-4 text-white/45 text-lg max-w-lg mx-auto">
                        Get started in minutes and build your second brain in no time.
                    </motion.p>
                </InView>

                <div className="grid sm:grid-cols-2 gap-6">
                    {steps.map(({ num, title, desc }, i) => (
                        <InView key={num}>
                            <motion.div
                                variants={fadeUp}
                                custom={i * 0.1}
                                className="glass-strong rounded-2xl p-7 border border-white/10 card-hover relative overflow-hidden"
                            >
                                <span className="absolute top-4 right-5 text-4xl font-black text-violet-500/10 select-none font-mono">
                                    {num}
                                </span>
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-700/20 border border-violet-500/30 flex items-center justify-center mb-4">
                                    <span className="text-xs font-bold text-violet-300">{num}</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                                <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
                            </motion.div>
                        </InView>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
    return (
        <section className="py-24 px-6">
            <InView className="max-w-3xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    custom={0}
                    className="glass-strong rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden glow-violet-sm"
                >
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/10 to-purple-800/5" />
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-900/50 pulse-glow">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold gradient-text-white mb-4">
                        Start building your<br />second brain today
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2} className="text-white/45 mb-8 max-w-md mx-auto">
                        Free forever. No credit card needed. Join hundreds of people who never lose a good idea again.
                    </motion.p>
                    <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/signup">
                            <Button size="lg" className="w-full sm:w-auto group px-10 text-base">
                                Create free account
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/signin">
                            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white/50 hover:text-white text-base">
                                Sign in instead
                            </Button>
                        </Link>
                    </motion.div>
                    <motion.div variants={fadeUp} custom={4} className="mt-8 flex items-center justify-center gap-5 text-xs text-white/25">
                        {["Free forever", "No credit card", "Cancel anytime"].map((t) => (
                            <span key={t} className="flex items-center gap-1">
                                <Check className="w-3 h-3 text-violet-400" /> {t}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </InView>
        </section>
    );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer className="border-t border-white/6 py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold gradient-text">Second Brain</span>
                </div>
                <p className="text-xs text-white/25">
                    Built with ♥ — your personal knowledge hub
                </p>
                <div className="flex items-center gap-4 text-xs text-white/30">
                    <Link to="/signin" className="hover:text-white/60 transition-colors">Sign in</Link>
                    <Link to="/signup" className="hover:text-white/60 transition-colors">Sign up</Link>
                </div>
            </div>
        </footer>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function LandingPage() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        // If already logged in, we let them navigate manually; don't auto-redirect
    }, []);

    return (
        <ShaderBackground>
            <LandingNav />
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </ShaderBackground>
    );
}
