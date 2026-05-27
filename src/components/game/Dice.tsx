import { DiceValue } from "@/lib/game/types";

export function Dice({ dice, available }: { dice: DiceValue[]; available: DiceValue[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(dice.length ? dice : [1, 2]).map((die, index) => (
        <div key={`${die}-${index}`} className={`grid h-11 w-11 place-items-center rounded-lg border text-lg font-black shadow-lg ${available.includes(die as DiceValue) ? "border-teal-200 bg-teal-200 text-slate-950" : "border-white/10 bg-white/10 text-slate-400"}`}>
          {die}
        </div>
      ))}
    </div>
  );
}
