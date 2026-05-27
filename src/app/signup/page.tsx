"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function SignupPage() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-12">
      <Card className="w-full">
        <h1 className="text-3xl font-black">Create account</h1>
        {!auth.cloudEnabled ? <p className="mt-3 rounded-md bg-amber-300/10 p-3 text-sm text-amber-100">Cloud sync is not configured. You are playing as a guest.</p> : null}
        <input className="mt-5 w-full rounded-md border border-white/10 bg-white/5 p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="mt-5 w-full" onClick={() => auth.signUp(email, password)}>Sign Up</Button>
        <p className="mt-4 text-sm text-slate-400">Already have an account? <Link href="/login" className="text-amber-200">Sign in</Link></p>
      </Card>
    </section>
  );
}
