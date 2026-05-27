"use client";

import { useMemo, useState } from "react";
import {
  Flame,
  Globe,
  Shield,
  TrendingUp,
  Trophy,
  Wifi,
} from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const players = [
  {
    username: "Diana",
    city: "Almaty",
    rating: 1590,
    wins: 87,
    winRate: 68,
    streak: 7,
    online: true,
    elo: "+24",
    tier: "Elite",
  },
  {
    username: "Daniyal",
    city: "Almaty",
    rating: 1390,
    wins: 73,
    winRate: 64,
    streak: 4,
    online: true,
    elo: "+18",
    tier: "Master",
  },
  {
    username: "Miras",
    city: "Astana",
    rating: 1355,
    wins: 68,
    winRate: 61,
    streak: 3,
    online: false,
    elo: "+11",
    tier: "Diamond",
  },
  {
    username: "Amina",
    city: "Shymkent",
    rating: 1310,
    wins: 61,
    winRate: 59,
    streak: 2,
    online: true,
    elo: "+9",
    tier: "Diamond",
  },
  {
    username: "Dias",
    city: "Almaty",
    rating: 1280,
    wins: 55,
    winRate: 57,
    streak: 5,
    online: false,
    elo: "+15",
    tier: "Competitive",
  },
  {
    username: "Temirlan",
    city: "Astana",
    rating: 1265,
    wins: 52,
    winRate: 56,
    streak: 6,
    online: true,
    elo: "+21",
    tier: "Competitive",
  },
];

function statCard(
  icon: React.ReactNode,
  label: string,
  value: string
) {
  return (
    <Card className="border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 text-slate-200">
          {icon}
        </div>

        <TrendingUp className="h-4 w-4 text-emerald-300" />
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </Card>
  );
}

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("Global");

  const list = useMemo(() => {
    if (filter === "Global") return players;

    return players.filter(
      (p) =>
        p.city === filter ||
        filter === "Kazakhstan" ||
        filter === "Friends"
    );
  }, [filter]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            <Wifi className="h-3 w-3" />
            Live Competitive Rankings
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight text-white">
            Global Leaderboards
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Track competitive rankings, city-based performance, win streaks,
            and AI-reviewed match activity across Backgammon Arena.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:w-[360px]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Active Players
            </p>

            <p className="mt-2 text-3xl font-black text-white">12.4K</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Ranked Matches
            </p>

            <p className="mt-2 text-3xl font-black text-white">84K</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {statCard(
          <Trophy className="h-5 w-5" />,
          "Top Rating",
          "1420"
        )}

        {statCard(
          <Flame className="h-5 w-5" />,
          "Longest Streak",
          "12"
        )}

        {statCard(
          <Shield className="h-5 w-5" />,
          "Avg. Win Rate",
          "61%"
        )}

        {statCard(
          <Globe className="h-5 w-5" />,
          "Cities",
          "18"
        )}
      </div>

      <div className="mt-8">
        <Tabs
          tabs={["Global", "Almaty", "Astana", "Kazakhstan", "Friends"]}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <Card className="mt-8 overflow-hidden border border-white/10 bg-white/[0.03] p-0">
        <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.03] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          <span>Rank</span>
          <span className="col-span-2">Player</span>
          <span>Rating</span>
          <span>Win Rate</span>
          <span>Streak</span>
          <span>Status</span>
        </div>

        {list.map((p, i) => (
          <div
            key={p.username}
            className="grid grid-cols-7 items-center gap-3 border-b border-white/5 px-6 py-5 transition-colors duration-200 hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 font-black text-white">
                #{i + 1}
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300/30 to-cyan-300/20 text-lg font-black text-white">
                {p.username.slice(0, 1)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">{p.username}</p>

                  <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                    {p.tier}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-400">{p.city}</p>
              </div>
            </div>

            <div>
              <p className="font-black text-white">{p.rating}</p>
              <p className="mt-1 text-xs font-bold text-emerald-300">
                {p.elo} ELO
              </p>
            </div>

            <div>
              <Badge>{p.winRate}%</Badge>
            </div>

            <div className="flex items-center gap-2 text-orange-300">
              <Flame className="h-4 w-4" />
              <span className="font-bold">{p.streak}</span>
            </div>

            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${
                  p.online
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-white/5 text-slate-400"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    p.online ? "bg-emerald-300" : "bg-slate-500"
                  }`}
                />
                {p.online ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        ))}
      </Card>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {players
          .filter((p) => p.city === "Almaty")
          .slice(0, 3)
          .map((p) => (
            <Card
              key={p.username}
              className="border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-black text-white">
                    {p.username}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {p.city} • {p.rating} rating
                  </p>
                </div>

                <div className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                  {p.streak} win streak
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-black/10 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    AI Performance Score
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    {p.winRate + 22}
                  </p>
                </div>

                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                  Improving
                </div>
              </div>
            </Card>
          ))}
      </div>
    </section>
  );
}
