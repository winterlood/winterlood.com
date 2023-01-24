import classNames from "classnames/bind";
import Link from "next/link";
import { IPost } from "types/global";
import style from "./PostItem.module.scss";
import Tag from "./Tag";
import winterlood from "public/image/winterlood.png";

const cx = classNames.bind(style);

interface IProps extends IPost {}

export default function PostItem(props: IProps) {
  return (
    <div className={cx("container")}>
      <Link href={`/post/${props.id}`} passHref>
        <div
          className={cx("thumbnail_col")}
          style={{ backgroundImage: `url(${props.cover || winterlood.src})` }}
        ></div>
        <div className={cx("info_col")}>
          <div className={cx("title")}>{props.title}</div>
          <div className={cx("subtitle")}>{props.subtitle}</div>
          <div className={cx("desc")}>
            <div className={cx("create_time")}>
              {new Date(props.createTime).toLocaleDateString()} 작성
            </div>
          </div>
          <div className={cx("tag")}>
            {props.tags.map((tag) => (
              <Tag key={`${props.id}-${tag}`}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
