import { Move } from "@/lib/game/types";

export function MoveHistory({ moves }: { moves: Move[] }) {
  return (
    <div className="max-h-72 overflow-auto rounded-lg border border-white/10 bg-black/20 p-3">
      <h3 className="mb-2 font-bold">Move Log</h3>
      {moves.length === 0 ? <p className="text-sm text-slate-500">Roll dice to begin.</p> : moves.slice().reverse().map((move, index) => (
        <div key={moves.length - index} className="border-b border-white/5 py-2 text-sm text-slate-300">
          {moves.length - index}. {move.player} {move.from} {"->"} {move.to} using {move.die}
        </div>
      ))}
    </div>
  );
}
