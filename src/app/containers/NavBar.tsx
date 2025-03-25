"use client";
import styles from "../styles/Nav.module.css";
import { INavBar, setLocal } from "../utils";
import { useAppStore } from "../store";

export const NavBar = ({ theme, setTheme }: INavBar) => {
  const { nav, setNav } = useAppStore();
  const isLogin = nav === "login"

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setLocal({ theme: newTheme });
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className={styles.nav}>
      <h1>TaskFlow</h1>
      <div>
        <button
          className="loginButton"
          onClick={() => setNav(isLogin ? "home" : "login")}
        >
          {isLogin ? "HOME" : "LOGIN"}
        </button>
        <button style={{ marginInline: 5 }} onClick={toggleTheme}>
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
};
