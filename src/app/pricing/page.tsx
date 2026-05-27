"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

const free = ["Local games", "Play vs Easy AI", "Basic stats", "3 AI Coach analyses per week", "Guest progress"];
const pro = ["Unlimited AI Coach", "Medium and Hard AI bots", "Advanced statistics", "Custom board skins", "Cloud match history", "City tournaments", "Priority multiplayer rooms"];

export default function PricingPage() {
  const [open, setOpen] = useState(false);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-black">Pro Subscription</h1>
      <p className="mt-3 max-w-2xl text-slate-400">A clear monetization path for serious learners and social competitors.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card><h2 className="text-2xl font-bold">Free</h2><p className="mt-2 text-3xl font-black">$0</p><ul className="mt-6 grid gap-3">{free.map((x) => <li key={x} className="flex gap-2"><Check className="text-emerald-300" /> {x}</li>)}</ul><Button className="mt-6" variant="secondary">Current Plan</Button></Card>
        <Card className="border-amber-300/40"><h2 className="text-2xl font-bold">Pro</h2><p className="mt-2 text-3xl font-black">$4.99<span className="text-sm text-slate-400">/month</span></p><ul className="mt-6 grid gap-3">{pro.map((x) => <li key={x} className="flex gap-2"><Check className="text-amber-300" /> {x}</li>)}</ul><Button className="mt-6" onClick={() => setOpen(true)}>Upgrade to Pro</Button></Card>
      </div>
      <Modal open={open} title="Mock Checkout" onClose={() => setOpen(false)}><p className="text-slate-300">Stripe checkout is not connected in this demo, but the product is designed for subscription monetization.</p></Modal>
    </section>
  );
}
