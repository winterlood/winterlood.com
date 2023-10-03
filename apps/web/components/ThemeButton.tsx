"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import type { Theme } from "types";
import Icon from "./Icon";
import style from "./ThemeButton.module.scss";

const cx = classNames.bind(style);

export default function ThemeChangeButton() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | Theme
      | undefined;
    if (savedTheme) {
      setTheme(savedTheme);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    setTheme("light");
  }, []);

  useEffect(() => {
    if (theme) {
      window.localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!theme) return null;

  return (
    <div className={cx("container")} onClick={toggleTheme}>
      <Icon type="THEME" />
    </div>
  );
}
