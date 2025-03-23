"use client";
import { useEffect, useState } from "react";
import { Home } from "./containers/Home";
import { NavBar } from "./containers/NavBar";
import { getLocal, parse, setLocal } from "./utils";

export default function Content() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = parse(getLocal("theme")) || "light";
    setTheme(savedTheme);
    setLocal({ theme: savedTheme });
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  if (!theme) return;
  return (
    <main>
      <NavBar theme={theme} setTheme={setTheme} />
      <Home />
    </main>
  );
}
