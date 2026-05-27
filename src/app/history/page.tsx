"use client";

import { useState } from "react";
import { loadGuestGames, GuestGame } from "@/lib/storage/localStorage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default function HistoryPage() {
  const [games] = useState<GuestGame[]>(() => loadGuestGames());
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-black">Match History</h1>
      {!games.length ? <div className="mt-8"><EmptyState title="No matches yet.">Play your first game to start building your history.</EmptyState></div> : <Card className="mt-6 p-0">{games.map((g) => <div key={g.id} className="grid gap-3 border-b border-white/10 p-4 text-sm md:grid-cols-7"><span>{new Date(g.date).toLocaleDateString()}</span><b>{g.mode}</b><span>{g.opponent}</span><span>{g.result}</span><span>{g.movesCount} moves</span><span>{g.duration} / {g.ratingChange > 0 ? "+" : ""}{g.ratingChange}</span><Button variant="secondary">View Analysis</Button></div>)}</Card>}
    </section>
  );
}
