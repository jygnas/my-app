"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return getSystemTheme();
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const opposite = useMemo<Theme>(() => (theme === "light" ? "dark" : "light"), [theme]);

  return (
    <button
      onClick={() => setTheme(opposite)}
      aria-label="Toggle theme"
      style={{
        appearance: "none",
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(0,0,0,0.15)",
        color: "inherit",
        padding: "0.5rem 0.75rem",
        borderRadius: 9999,
        cursor: "pointer",
        backdropFilter: "saturate(120%) blur(6px)",
        WebkitBackdropFilter: "saturate(120%) blur(6px)",
        fontWeight: 600,
      }}
    >
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
}


