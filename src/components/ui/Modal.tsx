"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="glass w-full max-w-2xl rounded-lg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="ghost" className="h-9 w-9 p-0" onClick={onClose} aria-label="Close modal"><X size={18} /></Button>
        </div>
        {children}
      </div>
    </div>
  );
}
