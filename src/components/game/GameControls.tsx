import { RotateCcw, Undo2, StepForward, Dices } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function GameControls({ canRoll, onRoll, onEndTurn, onUndo, onRestart }: { canRoll: boolean; onRoll: () => void; onEndTurn: () => void; onUndo: () => void; onRestart: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <Button onClick={onRoll} disabled={!canRoll}><Dices size={17} /> Roll</Button>
      <Button variant="secondary" onClick={onEndTurn}><StepForward size={17} /> End</Button>
      <Button variant="secondary" onClick={onUndo}><Undo2 size={17} /> Undo</Button>
      <Button variant="ghost" onClick={onRestart}><RotateCcw size={17} /> Restart</Button>
    </div>
  );
}
