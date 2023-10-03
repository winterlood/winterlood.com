import classNames from "classnames/bind";
import style from "./Header.module.scss";
import ThemeChangeButton from "@/components/ThemeButton";
import Link from "next/link";

const cx = classNames.bind(style);

export default function Header() {
  return (
    <div className={cx("container")}>
      <div className={cx("logo")}>
        <Link href={"/about"}>Winterlood's</Link>
      </div>
      <div className={cx("icon")}>
        <ThemeChangeButton />
      </div>
    </div>
  );
}
