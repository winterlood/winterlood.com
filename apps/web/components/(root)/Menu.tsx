"use client";
import classNames from "classnames/bind";
import { usePathname, useRouter } from "next/navigation";
import style from "./Menu.module.scss";

const cx = classNames.bind(style);
const menus = [
  {
    key: "about",
    name: "소개",
    path: "",
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
    key: "exp",
    name: "WORK",
    path: "exp",
  },
];

export default function Menu() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className={cx("container")}>
      {menus.map(({ key, name, path: curPath }) => (
        <div
          key={key}
          className={cx("menu", {
            selected_menu: path === `/${curPath}`,
          })}
          onClick={() => router.push(`/${curPath}`)}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
