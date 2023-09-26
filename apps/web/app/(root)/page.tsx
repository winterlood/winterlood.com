import classNames from "classnames/bind";
import style from "./page.module.scss";

const cx = classNames.bind(style);

export default function Page(): JSX.Element {
  return <main className={cx("container")}>hello</main>;
}
