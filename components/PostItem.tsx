import classNames from "classnames/bind";
import Link from "next/link";
import { IPost } from "types/global";
import style from "./PostItem.module.scss";
import Tag from "./Tag";
const cx = classNames.bind(style);

interface IProps extends IPost {}

export default function PostItem(props: IProps) {
  return (
    <div className={cx("container")}>
      <Link href={`/post/${props.id}`}>
        <div className={cx("desc")}>
          {new Date(props.createTime).toLocaleDateString()}
        </div>
        <div className={cx("title")}>{props.title}</div>
        {props.subtitle && (
          <div className={cx("subtitle")}>{props.subtitle}</div>
        )}
        <div className={cx("tag")}>
          {props.tags.map((tag) => (
            <Tag key={`${props.id}-${tag}`}>{tag}</Tag>
          ))}
        </div>
      </Link>
    </div>
  );
}
