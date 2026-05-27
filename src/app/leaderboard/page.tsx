"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const players = [
  { username: "Aruzhan", city: "Almaty", rating: 1420, wins: 87, winRate: 68 },
  { username: "Daniyal", city: "Almaty", rating: 1390, wins: 73, winRate: 64 },
  { username: "Miras", city: "Astana", rating: 1355, wins: 68, winRate: 61 },
  { username: "Amina", city: "Shymkent", rating: 1310, wins: 61, winRate: 59 },
  { username: "Dias", city: "Almaty", rating: 1280, wins: 55, winRate: 57 },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("Global");
  const list = filter === "Global" ? players : players.filter((p) => p.city === filter || filter === "Kazakhstan" || filter === "Friends");
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-black">City Leaderboards</h1>
      <p className="mt-3 text-slate-400">Mock data now, Supabase rankings later. The social loop is already designed.</p>
      <div className="mt-6"><Tabs tabs={["Global", "Almaty", "Astana", "Kazakhstan", "Friends"]} active={filter} onChange={setFilter} /></div>
      <Card className="mt-6 overflow-hidden p-0">
        {list.map((p, i) => <div key={p.username} className="grid grid-cols-6 items-center gap-3 border-b border-white/10 p-4 text-sm"><b>#{i + 1}</b><span className="col-span-2 font-bold">{p.username}<br /><small className="text-slate-400">{p.city}</small></span><b>{p.rating}</b><span>{p.wins} wins</span><Badge>{p.winRate}%</Badge></div>)}
      </Card>
      <h2 className="mt-10 text-2xl font-black">Top Players from Almaty</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">{players.filter((p) => p.city === "Almaty").map((p) => <Card key={p.username}><b>{p.username}</b><p className="text-sm text-slate-400">{p.rating} rating, {p.winRate}% win rate</p></Card>)}</div>
    </section>
  );
}
