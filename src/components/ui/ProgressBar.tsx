export function ProgressBar({ value }: { value: number }) {
  return <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-300" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}
