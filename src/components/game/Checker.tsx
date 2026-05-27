import { Player } from "@/lib/game/types";

export function Checker({ player, selected, small = false }: { player: Player; selected?: boolean; small?: boolean }) {
  return (
    <div
      className={`${small ? "h-6 w-6" : "h-8 w-8 sm:h-9 sm:w-9"} rounded-full border shadow-lg transition ${
        player === "white"
          ? "border-amber-100 bg-gradient-to-br from-white to-amber-100"
          : "border-slate-500 bg-gradient-to-br from-slate-700 to-black"
      } ${selected ? "ring-4 ring-emerald-300" : ""}`}
    />
  );
}
