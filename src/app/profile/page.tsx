"use client";

import Link from "next/link";
import { useState } from "react";
import { Trophy, Flame, ChartNoAxesColumn, User } from "lucide-react";
import { loadGuestGames, loadGuestStats, GuestStats, GuestGame } from "@/lib/storage/localStorage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";

export default function ProfilePage() {
  const [stats] = useState<GuestStats>(() => loadGuestStats());
  const [games] = useState<GuestGame[]>(() => loadGuestGames());
  const winRate = stats.totalGames ? Math.round((stats.wins / stats.totalGames) * 100) : 0;
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <Card className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4"><div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-emerald-300 text-slate-950"><User /></div><div><h1 className="text-3xl font-black">{stats.username}</h1><p className="text-slate-400">{stats.city} - guest profile</p></div></div>
        <div className="flex gap-3"><Button variant="secondary">Edit Profile</Button><Link href="/history"><Button variant="secondary">View Match History</Button></Link><Link href="/pricing"><Button>Upgrade to Pro</Button></Link></div>
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-4"><StatCard label="Rating" value={stats.rating} icon={<Trophy />} /><StatCard label="Total games" value={stats.totalGames} icon={<ChartNoAxesColumn />} /><StatCard label="Win rate" value={`${winRate}%`} /><StatCard label="Current streak" value={stats.currentStreak} icon={<Flame />} /></div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card><h2 className="font-bold">Progress</h2><div className="mt-4 grid gap-4"><p>Wins {stats.wins} / Losses {stats.losses}</p><ProgressBar value={winRate} /><p>Best streak: {stats.bestStreak}. Favorite mode: {stats.favoriteMode}.</p></div></Card>
        <Card><h2 className="font-bold">Weekly Activity</h2><div className="mt-4 flex h-32 items-end gap-2">{[30, 55, 25, 70, 42, 80, 50].map((h, i) => <div key={i} className="flex-1 rounded bg-emerald-300/70" style={{ height: `${h}%` }} />)}</div></Card>
      </div>
      <Card className="mt-6"><h2 className="font-bold">Last 5 Games</h2>{games.slice(0, 5).map((g) => <p key={g.id} className="mt-3 text-sm text-slate-400">{g.result} vs {g.opponent} - {g.movesCount} moves</p>)}{!games.length ? <p className="mt-3 text-slate-400">No matches yet. Play your first game to start building your history.</p> : null}</Card>
    </section>
  );
}
