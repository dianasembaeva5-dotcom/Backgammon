"use client";

import { useEffect, useState } from "react";

export function FastModeTimer({ active, onExpire }: { active: boolean; onExpire: () => void }) {
  const [seconds, setSeconds] = useState(300);
  useEffect(() => {
    if (!active || seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [active, seconds]);
  useEffect(() => { if (seconds === 0) onExpire(); }, [seconds, onExpire]);
  const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");
  return <div className="rounded-lg border border-teal-300/30 bg-teal-300/10 p-3 text-center"><p className="text-xs uppercase text-teal-200">Fast 5-Minute</p><p className="font-mono text-2xl font-black">{mm}:{ss}</p></div>;
}
