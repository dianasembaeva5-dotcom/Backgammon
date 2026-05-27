"use client";

export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (tab: string) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-white/15 bg-white/5 p-1">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onChange(tab)} className={`rounded-md px-3 py-2 text-sm font-semibold transition ${active === tab ? "bg-teal-400 text-slate-950" : "text-slate-300 hover:bg-white/10"}`}>
          {tab}
        </button>
      ))}
    </div>
  );
}
