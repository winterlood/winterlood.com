import classNames from "classnames/bind";
import style from "./page.module.scss";
import { fetchPage } from "util/fetchPage";

const cx = classNames.bind(style);

export default async function Page() {
  const { info, recordMap } = await fetchPage("ABOUT");

  return <main className={cx("container")}>{info.title}</main>;
}
