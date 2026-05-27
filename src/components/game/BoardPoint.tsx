import { Checker } from "./Checker";
import { Point, Player } from "@/lib/game/types";

export function BoardPoint({ index, point, top, selected, legal, onClick }: { index: number; point: Point; top: boolean; selected: boolean; legal: boolean; onClick: () => void }) {
  const color = index % 2 === 0 ? "bg-amber-300/85" : "bg-emerald-700/85";
  const checkers = Array.from({ length: Math.min(point.count, 5) });
  return (
    <button onClick={onClick} className={`relative flex min-h-32 justify-center overflow-hidden rounded-sm transition ${legal ? "bg-emerald-300/15 ring-2 ring-emerald-300" : "hover:bg-white/5"}`}>
      <div className={`absolute inset-x-0 ${top ? "top-0 triangle-light" : "bottom-0 triangle-dark"} h-full ${color}`} />
      <div className={`relative z-10 flex h-full flex-col items-center gap-1 p-1 ${top ? "" : "justify-end"}`}>
        {checkers.map((_, i) => <Checker key={i} player={point.owner as Player} selected={selected && i === 0} />)}
        {point.count > 5 ? <span className="rounded bg-black/50 px-1 text-xs font-bold text-white">+{point.count - 5}</span> : null}
      </div>
      <span className="absolute bottom-1 right-1 z-10 text-[10px] text-white/45">{index + 1}</span>
    </button>
  );
}
