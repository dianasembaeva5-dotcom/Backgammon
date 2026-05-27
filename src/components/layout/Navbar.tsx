"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["Home", "/"],
  ["Play", "/game"],
  ["Learn", "/learn"],
  ["Leaderboard", "/leaderboard"],
  ["Pricing", "/pricing"],
  ["Profile", "/profile"],
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <header
        className="pointer-events-auto w-full max-w-5xl"
        style={{
          background: "rgba(5, 9, 18, 0.82)",
          border: "1px solid rgba(45,212,191,0.14)",
          borderRadius: "9999px",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          boxShadow:
            "0 0 0 1px rgba(45,212,191,0.06), 0 8px 40px rgba(0,0,0,0.45), 0 2px 12px rgba(45,212,191,0.08)",
        }}
      >
      <nav className="relative flex h-[52px] items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          {/* Icon badge */}
          <div
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)",
              boxShadow: "0 0 0 1px rgba(45,212,191,0.35), 0 4px 16px rgba(45,212,191,0.25)",
            }}
          >
            <Dices size={16} className="text-[#030a0a]" />
          </div>
          {/* Wordmark */}
          <span
            className="hidden text-[15px] font-black tracking-tight sm:block"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-white/90">Backgammon</span>{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #2dd4bf, #5eead4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Arena
            </span>
          </span>
        </Link>

        {/* Desktop nav — pill container */}
        <div
          className="hidden md:flex items-center gap-0.5 rounded-full px-1.5 py-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {links.map(([label, href]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 ${
                  active
                    ? "text-[#030a0a]"
                    : "text-white/50 hover:text-white/85 hover:bg-white/[0.06]"
                }`}
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)",
                        boxShadow: "0 0 12px rgba(45,212,191,0.4)",
                      }
                    : undefined
                }
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link href="/game">
            <Button size="sm">Play Now</Button>
          </Link>
        </div>
      </nav>
      </header>
    </div>
  );
}
