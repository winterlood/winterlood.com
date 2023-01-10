import style from "./Tag.module.scss";
import classNames from "classnames/bind";
import { IChildren } from "types/global";
const cx = classNames.bind(style);

interface IProps {
  children: IChildren;
}

export default function Tag(props: IProps) {
  return <span className={cx("container")}>{props.children}</span>;
}
