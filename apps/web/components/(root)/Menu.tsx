"use client";
import classNames from "classnames/bind";
import { usePathname } from "next/navigation";
import style from "./Menu.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);
const menus = [
  {
    key: "about",
    name: "소개",
    path: "about",
  },
  {
    key: "post",
    name: "포스트",
    path: "post",
  },
  {
    key: "qna",
    name: "Q&A",
    path: "qna",
  },
  {
    key: "work",
    name: "WORK",
    path: "work",
  },
];

export default function Menu() {
  const path = usePathname();

  return (
    <div className={cx("container")}>
      {menus.map(({ key, name, path: curPath }) => (
        <Link
          key={key}
          href={`/${curPath}`}
          className={cx("menu", {
            selected_menu: path === `/${curPath}`,
          })}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
