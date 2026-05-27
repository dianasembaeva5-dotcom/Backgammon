import Link from "next/link";
import {
  Bot, Brain, ChartNoAxesColumn, Clock, GraduationCap,
  Lightbulb, MapPin, Users, Zap, Shield, Star, Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CosmicSpectrum } from "@/components/ui/cosmos-spectrum";

/* ─── Feature data ─────────────────────────────────────────── */
const features = [
  { title: "Play vs AI", desc: "Challenge bots from beginner to grandmaster level.", icon: Bot, color: "#2dd4bf", glow: "rgba(45,212,191,0.12)", border: "rgba(45,212,191,0.2)" },
  { title: "Local Multiplayer", desc: "Face a friend on the same device, any time.", icon: Users, color: "#2dd4bf", glow: "rgba(45,212,191,0.12)", border: "rgba(45,212,191,0.2)" },
  { title: "AI Coach", desc: "Deep post-game analysis with actionable strategy tips.", icon: Brain, color: "#a78bfa", glow: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.2)" },
  { title: "Move Hints", desc: "Visualize every legal move before you commit.", icon: Lightbulb, color: "#5eead4", glow: "rgba(45,212,191,0.12)", border: "rgba(45,212,191,0.2)" },
  { title: "Player Statistics", desc: "Track rating, wins, streaks, and growth over time.", icon: ChartNoAxesColumn, color: "#34d399", glow: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.2)" },
  { title: "City Leaderboards", desc: "Compete with players from Almaty, Astana, and beyond.", icon: MapPin, color: "#fb7185", glow: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.2)" },
  { title: "Fast 5-Min Mode", desc: "Blitz matches built for mobile and quick sessions.", icon: Clock, color: "#38bdf8", glow: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.2)" },
  { title: "Learning Hub", desc: "Rules, openings, and common mistakes — learn from zero.", icon: GraduationCap, color: "#fb923c", glow: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.2)" },
];

const stats = [
  { value: "10K+", label: "Games Played" },
  { value: "500+", label: "Active Players" },
  { value: "8", label: "AI Levels" },
  { value: "5", label: "Cities" },
];

/* ─── Page ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div>

      {/* ══════════════════ HERO — CosmicSpectrum ══════════════════ */}
      <CosmicSpectrum title="Backgammon Arena" color="original" blur>
        <Badge className="mb-1 animate-slide-up">
          <Zap size={11} />
          AI Coaching · Fast Mode · City Rankings
        </Badge>
        <p
          className="mx-auto mt-3 max-w-2xl text-center leading-8 text-white/50 px-4 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Modern backgammon with AI coaching, lightning-fast matches, and city-wide rankings.{" "}
          <span style={{ color: "rgba(255,255,255,0.72)" }}>
            Not just a board — a competitive platform.
          </span>
        </p>
        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Link href="/game">
            <Button size="lg" className="min-h-12 px-8 text-base gap-2">
              <Trophy size={16} />
              Play Now
            </Button>
          </Link>
          <Link href="/learn">
            <Button variant="secondary" size="lg" className="min-h-12 px-7 text-base gap-2">
              <GraduationCap size={16} />
              Learn Strategy
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost" size="lg" className="min-h-12 px-6 text-base gap-2">
              <Star size={15} />
              Go Pro
            </Button>
          </Link>
        </div>
      </CosmicSpectrum>

      {/* ══ Remaining sections sit above the fixed spectrum bars ══ */}
      <div className="relative z-20" style={{ background: "var(--body-bg)" }}>

        {/* ══════════════════ STATS ══════════════════ */}
        <div className="section-divider" />
        <section className="py-12 px-4">
          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="display-sans text-4xl gradient-gold">{value}</div>
                <div
                  className="mt-1.5 text-xs uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="section-divider" />

        {/* ══════════════════ FEATURES ══════════════════ */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center mb-14">
            <Badge variant="outline">Platform Features</Badge>
            <h2 className="display-serif mt-5 font-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--foreground)" }}>
              Everything around the board
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
              Practice, review, compare, and come back with a better plan every match.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, desc, icon: Icon, color, glow, border }) => (
              <div
                key={title}
                className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{
                  background: "var(--card)",
                  border: `1px solid ${border}`,
                  boxShadow: `0 0 30px ${glow}, 0 4px 20px rgba(0,0,0,0.2)`,
                  backdropFilter: "blur(16px)",
                }}
              >
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                  style={{ background: glow }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-bold" style={{ color: "var(--foreground)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {desc}
                </p>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 40px ${glow}` }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════ WHY US ══════════════════ */}
        <div className="section-divider" />
        <section className="relative overflow-hidden py-24 px-4">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,212,191,0.05), transparent)",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <h2
              className="display-serif font-bold leading-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
            >
              Most backgammon sites
              <br />
              give you just a board.
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.45)" }}
            >
              Backgammon Arena gives you a{" "}
              <span className="gradient-gold font-semibold">complete improvement system</span>
              {" "}— coaching, analysis, competition, and community.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                {
                  icon: Brain,
                  title: "AI That Teaches",
                  desc: "Every game ends with a coaching session — what went wrong and how to fix it.",
                  color: "#a78bfa",
                  bg: "rgba(167,139,250,0.1)",
                  border: "rgba(167,139,250,0.2)",
                },
                {
                  icon: Trophy,
                  title: "Real Competition",
                  desc: "City rankings, ELO ratings, and weekly ladders keep you motivated.",
                  color: "#2dd4bf",
                  bg: "rgba(45,212,191,0.1)",
                  border: "rgba(45,212,191,0.2)",
                },
                {
                  icon: Shield,
                  title: "Built to Last",
                  desc: "Clean UI, offline play, mobile-first design. No ads, no clutter.",
                  color: "#2dd4bf",
                  bg: "rgba(45,212,191,0.1)",
                  border: "rgba(45,212,191,0.2)",
                },
              ].map(({ icon: Icon, title, desc, color, bg, border }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--card)",
                    border: `1px solid ${border}`,
                    boxShadow: `0 0 30px ${bg}`,
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: bg }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="section-divider" />

        {/* ══════════════════ CTA ══════════════════ */}
        <section className="relative py-28 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(45,212,191,0.06), transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "600px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(45,212,191,0.04)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-8"
              style={{
                borderColor: "rgba(45,212,191,0.25)",
                background: "rgba(45,212,191,0.08)",
                color: "#2dd4bf",
              }}
            >
              <Star size={10} fill="currentColor" />
              Free to Play
            </div>

            <h2
              className="display-serif font-bold leading-tight"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", color: "var(--foreground)" }}
            >
              Start your first
              <br />
              <span className="gradient-gold text-glow-gold">match today.</span>
            </h2>

            <p
              className="mt-6 max-w-lg mx-auto"
              style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.42)", lineHeight: "1.75" }}
            >
              No account required. Jump in, play a game, and see the difference.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/game">
                <Button size="lg" className="min-h-14 px-10 text-base gap-2.5">
                  <Trophy size={18} />
                  Play for Free
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="secondary" size="lg" className="min-h-14 px-8 text-base">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>{/* /z-20 content wrapper */}
    </div>
  );
}
