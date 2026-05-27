import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Player } from "@/lib/game/types";

export function GameResultModal({ winner, onAnalyze, onRestart }: { winner: Player | null; onAnalyze: () => void; onRestart: () => void }) {
  return (
    <Modal open={Boolean(winner)} title="Match Complete" onClose={onRestart}>
      <p className="text-slate-300"><b className="capitalize text-teal-300">{winner}</b> wins the match.</p>
      <div className="mt-5 flex gap-3"><Button onClick={onAnalyze}>AI Coach Analysis</Button><Button variant="secondary" onClick={onRestart}>Play Again</Button></div>
    </Modal>
  );
}
