"use client";
import styles from "../styles/Nav.module.css";
import { setLocal } from "../utils";

interface INavBar {
  theme: string | null;
  setTheme: (value: string) => void;
}
export const NavBar = ({ theme, setTheme }: INavBar) => {
  const toggleTheme = (value: string) => {
    setTheme(value);
    setLocal({ theme: value });
    document.documentElement.setAttribute("data-theme", value);
  };

  return (
    <nav className={styles.nav}>
      <h1>TaskFlow</h1>
      <button onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </nav>
  );
};
