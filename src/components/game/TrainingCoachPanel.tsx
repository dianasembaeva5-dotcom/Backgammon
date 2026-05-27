import { Card } from "@/components/ui/Card";
import { GameState } from "@/lib/game/types";

export function TrainingCoachPanel({ state }: { state: GameState }) {
  const tip = state.bar[state.currentPlayer] > 0
    ? "If you have a checker on the bar, you must enter it before moving other checkers."
    : state.dice.length
      ? `You rolled ${state.dice.join(" and ")}. Select a checker that can legally move by one of these values.`
      : "Try not to leave single checkers exposed unless the attack is worth it.";
  return <Card className="border-emerald-300/25"><p className="text-xs font-bold uppercase text-emerald-300">Coach Tip</p><p className="mt-2 text-sm text-slate-300">{tip}</p></Card>;
}
