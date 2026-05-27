export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-md border border-teal-300/30 bg-slate-950 px-4 py-3 text-sm text-teal-100 shadow-xl md:bottom-6">{message}</div>;
}
