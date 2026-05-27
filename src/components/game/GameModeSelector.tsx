import { Bot, Clock, GraduationCap, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { GameMode } from "@/lib/game/types";

const modes: { id: GameMode; title: string; copy: string; icon: React.ReactNode }[] = [
  { id: "local", title: "Local 2 Players", copy: "Share one device and play a complete match.", icon: <Users /> },
  { id: "ai", title: "Play vs AI", copy: "Train against an intentional bot with tactical preferences.", icon: <Bot /> },
  { id: "fast", title: "Fast 5-Minute Match", copy: "A mobile-first race with timer-based scoring.", icon: <Clock /> },
  { id: "training", title: "Training Mode", copy: "Hints, move explanations, and coach prompts.", icon: <GraduationCap /> },
];

export function GameModeSelector({ onSelect }: { onSelect: (mode: GameMode) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {modes.map((mode) => (
        <button key={mode.id} onClick={() => onSelect(mode.id)} className="text-left">
          <Card className="h-full transition hover:-translate-y-1 hover:border-teal-300/40">
            <div className="mb-4 text-teal-300">{mode.icon}</div>
            <h3 className="font-bold">{mode.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{mode.copy}</p>
          </Card>
        </button>
      ))}
    </div>
  );
}
