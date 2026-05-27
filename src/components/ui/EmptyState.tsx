import { ReactNode } from "react";
import { Card } from "./Card";

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return <Card className="py-12 text-center"><h2 className="text-xl font-bold">{title}</h2><p className="mx-auto mt-2 max-w-md text-slate-400">{children}</p></Card>;
}
