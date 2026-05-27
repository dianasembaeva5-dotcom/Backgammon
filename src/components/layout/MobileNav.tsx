"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChartNoAxesColumn, Home, Trophy, User } from "lucide-react";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Play", href: "/game", icon: Trophy },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Ranks", href: "/leaderboard", icon: ChartNoAxesColumn },
  { label: "Profile", href: "/profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        background: "rgba(5, 9, 18, 0.96)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
      <div className="grid grid-cols-5 px-2 py-2">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium transition-all duration-200 ${
                active ? "text-teal-400" : "text-white/40 hover:text-white/70"
              }`}
            >
              <Icon
                size={18}
                style={active ? { filter: "drop-shadow(0 0 6px rgba(45,212,191,0.8))" } : {}}
              />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
