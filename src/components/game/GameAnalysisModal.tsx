import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CoachReport } from "@/lib/ai/coach";

export function GameAnalysisModal({ report, open, onClose, onPlayAgain }: { report: CoachReport | null; open: boolean; onClose: () => void; onPlayAgain: () => void }) {
  if (!report) return null;
  return (
    <Modal open={open} title="AI Coach Analysis" onClose={onClose}>
      <div className="grid gap-4">
        <div className="rounded-lg bg-white/5 p-4"><p className="text-slate-300">{report.summary}</p><p className="mt-2 text-sm text-teal-200">Style: {report.style}</p></div>
        <div><h3 className="font-bold">Strengths</h3><ul className="mt-2 grid gap-2 text-sm text-slate-300">{report.strengths.map((s) => <li key={s}>- {s}</li>)}</ul></div>
        <div><h3 className="font-bold">Mistakes</h3><ul className="mt-2 grid gap-2 text-sm text-slate-300">{report.mistakes.map((m) => <li key={m.title}><b>{m.title}:</b> {m.description}</li>)}</ul></div>
        <div><h3 className="font-bold">Three Practical Tips</h3><ul className="mt-2 grid gap-2 text-sm text-slate-300">{report.tips.map((t) => <li key={t}>- {t}</li>)}</ul></div>
        <div className="flex gap-3"><Button onClick={onPlayAgain}>Play Again</Button><Button variant="secondary" onClick={onClose}>Save Analysis</Button></div>
      </div>
    </Modal>
  );
}
