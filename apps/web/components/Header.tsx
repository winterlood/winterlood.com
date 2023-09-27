import classNames from "classnames/bind";
import style from "./Header.module.scss";
import ThemeChangeButton from "./ThemeButton";

const cx = classNames.bind(style);

export default function Header() {
  return (
    <div className={cx("container")}>
      <div></div>
      <div className={cx("logo")}>Winterlood's</div>
      <div className={cx("icon")}>
        <ThemeChangeButton />
      </div>
    </div>
  );
}
