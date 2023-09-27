import type { ReactNode } from "react";
import { MdDarkMode } from "react-icons/md";
import classNames from "classnames/bind";
import style from "./Icon.module.scss";

const cx = classNames.bind(style);

type IconType = "THEME";

const iconMap: Record<IconType, ReactNode> = {
  THEME: <MdDarkMode />,
};

export default function Icon({ type }: { type: IconType }) {
  return <span className={cx("icon")}>{iconMap[type]}</span>;
}
