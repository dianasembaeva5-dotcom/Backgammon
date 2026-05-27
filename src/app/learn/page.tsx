import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const lessons = ["What is Backgammon?", "Board Structure", "How Checkers Move", "How Dice Work", "What is a Blot?", "What is Hitting?", "What is the Bar?", "What is Bearing Off?", "5 Beginner Mistakes", "5 Strategy Tips"];
const strategies = ["Don't leave too many blots.", "Build your home board.", "Escape back checkers early.", "Use doubles wisely.", "Balance attack and safety.", "Make points, not random moves."];

export default function LearnPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-black">Learn Backgammon Strategy</h1>
      <p className="mt-3 max-w-2xl text-slate-400">A beginner-friendly hub for rules, movement, hitting, bearing off, and the habits that make players better.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {lessons.map((lesson, i) => <Card key={lesson}><h2 className="font-bold">{i + 1}. {lesson}</h2><p className="mt-2 text-sm text-slate-400">Understand the concept, then practice it in Training Mode with legal move highlights and coach prompts.</p></Card>)}
      </div>
      <h2 className="mt-12 text-2xl font-black">Strategy Cards</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">{strategies.map((s) => <Card key={s} className="border-amber-300/20"><b>{s}</b></Card>)}</div>
      <Link href="/game" className="mt-8 inline-block"><Button>Practice these ideas in Training Mode</Button></Link>
    </section>
  );
}
