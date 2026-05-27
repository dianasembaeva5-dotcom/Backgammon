"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { loadTheme, saveTheme } from "@/lib/storage/localStorage";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => loadTheme());
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    saveTheme(next);
  };
  return <Button variant="ghost" className="h-10 w-10 p-0" onClick={toggle} aria-label="Toggle theme">{theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}</Button>;
}
