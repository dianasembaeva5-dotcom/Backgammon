import { Player } from "@/lib/game/types";

export function BearOffTray({ borneOff }: { borneOff: Record<Player, number> }) {
  return (
    <div className="grid gap-2 text-sm">
      <div className="rounded-md border border-white/10 bg-white/5 p-3">Ivory off <b>{borneOff.white}/15</b></div>
      <div className="rounded-md border border-white/10 bg-white/5 p-3">Obsidian off <b>{borneOff.black}/15</b></div>
    </div>
  );
}
