import classNames from "classnames/bind";
import style from "./Footer.module.scss";

const cx = classNames.bind(style);

export default function Footer() {
  return <div className={cx("container")}></div>;
}
