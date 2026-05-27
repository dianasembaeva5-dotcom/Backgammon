import { Checker } from "./Checker";
import { Player } from "@/lib/game/types";

export function Bar({ counts, onClick, active }: { counts: Record<Player, number>; onClick: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} className={`flex min-h-32 w-14 flex-col items-center justify-center gap-2 border-x border-amber-100/20 bg-black/25 ${active ? "ring-2 ring-emerald-300" : ""}`}>
      {counts.white ? <><Checker player="white" small /><span className="text-xs">{counts.white}</span></> : null}
      {counts.black ? <><Checker player="black" small /><span className="text-xs">{counts.black}</span></> : null}
      {!counts.white && !counts.black ? <span className="rotate-90 text-xs uppercase text-slate-500">bar</span> : null}
    </button>
  );
}
