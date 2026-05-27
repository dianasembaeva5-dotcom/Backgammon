import Link from "next/link";
import { Dices } from "lucide-react";

const links = [
  { label: "Multiplayer", href: "/multiplayer" },
  { label: "History", href: "/history" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Pro", href: "/pricing" },
  { label: "Profile", href: "/profile" },
];

export function Footer() {
  return (
    <footer
      className="relative mt-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(45,212,191,0.018))",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)",
              }}
            >
              <Dices size={15} className="text-[#040a14]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Backgammon Arena</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Play smarter. Improve faster.
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-5">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors duration-200 hover:text-teal-400"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            © 2026 Backgammon Arena
          </p>
        </div>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-teal-400/15 to-transparent" />
    </footer>
  );
}
