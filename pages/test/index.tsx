import style from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function TestPage() {
  return <div className={cx("container")}>hi</div>;
}
