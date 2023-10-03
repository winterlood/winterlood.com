import type { ReactNode } from "react";
import { MdDarkMode } from "react-icons/md";
import {
  BiSolidQuoteAltLeft,
  BiArrowBack,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoGithub,
  BiLogoLinkedin,
  BiMailSend,
} from "react-icons/bi";

import classNames from "classnames/bind";
import style from "./Icon.module.scss";

const cx = classNames.bind(style);

export type IconType =
  | "THEME"
  | "QUOTE"
  | "BACK"
  | "TWITTER"
  | "INSTAGRAM"
  | "GITHUB"
  | "LINKEDIN"
  | "MAIL";

const iconMap: Record<IconType, ReactNode> = {
  THEME: <MdDarkMode />,
  QUOTE: <BiSolidQuoteAltLeft />,
  BACK: <BiArrowBack />,
  TWITTER: <BiLogoTwitter />,
  INSTAGRAM: <BiLogoInstagram />,
  GITHUB: <BiLogoGithub />,
  LINKEDIN: <BiLogoLinkedin />,
  MAIL: <BiMailSend />,
};

export default function Icon({ type }: { type: IconType }) {
  return <span className={cx("icon")}>{iconMap[type]}</span>;
}
