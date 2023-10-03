import classNames from "classnames/bind";
import style from "./QnaItem.module.scss";
import { NotionPage } from "notion-api";
import Link from "next/link";

const cx = classNames.bind(style);

export default function QnaItem(props: NotionPage) {
  const { id, title, subtitle, createTime, tags } = props;

  return (
    <Link href={`/qna/${id}`}>
      <div className={cx("container")}>
        <div className={cx("container_inner")}>
          <div className={cx("info")}>
            <h3 className={cx("title")}>{title}</h3>
            <div className={cx("subtitle")}>{subtitle}</div>
            <div className={cx("createTime")}>
              {new Date(createTime).toLocaleDateString()}
            </div>
            <div className={"desktop " + cx("tag_wrapper")}>
              {tags.map((tag) => (
                <div key={`${id}-${tag}`} className={cx("tag")}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
