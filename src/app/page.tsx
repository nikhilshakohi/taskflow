"use client";
import { useEffect, useState } from "react";
import { Home } from "./containers/Home";
import { NavBar } from "./containers/NavBar";
import { getLocal, parse, setLocal } from "./utils";
import { Signin } from "./containers/Signin";
import { useAppStore } from "./store";

export default function Content() {
  const [theme, setTheme] = useState<string | null>(null);
  const { nav } = useAppStore();

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
      {nav !== 'login' ? <Home /> : <Signin />}
    </main>
  );
}
