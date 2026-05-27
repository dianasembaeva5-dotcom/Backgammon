"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export function useAuth() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(() => isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setLoading(false);
    });
  }, []);

  return {
    email,
    loading,
    isGuest: !email,
    cloudEnabled: isSupabaseConfigured,
    signIn: async (value: string, password: string) => supabase?.auth.signInWithPassword({ email: value, password }),
    signUp: async (value: string, password: string) => supabase?.auth.signUp({ email: value, password }),
    signOut: async () => {
      await supabase?.auth.signOut();
      setEmail(null);
    },
    signInWithGoogle: async () => supabase?.auth.signInWithOAuth({ provider: "google" }),
  };
}
