import { Move } from "@/lib/game/types";

export function MoveHints({ moves }: { moves: Move[] }) {
  return <p className="text-sm text-slate-400">{moves.length ? `${moves.length} legal move${moves.length === 1 ? "" : "s"} highlighted. Select a checker, then a destination.` : "No legal moves are available for this selection."}</p>;
}
