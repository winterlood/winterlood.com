import classNames from "classnames/bind";
import type { NotionPage } from "notion-api";
import Image, { ImageProps } from "next/image";
import style from "./PostItem.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);

export default function PostItem(props: NotionPage) {
  const {
    id,
    title,
    subtitle,
    createTime,
    thumbnail,
    tags,
    blurDataURL,
  } = props;

  const imageProps: ImageProps = {
    src: thumbnail,
    alt: title,
  };

  if (blurDataURL) {
    imageProps["blurDataURL"] = blurDataURL as string;
    imageProps["placeholder"] = "blur";
  }

  return (
    <Link href={`/post/${id}`}>
      <div className={cx("container")}>
        <div className={cx("container_inner")}>
          <div className={"mobile " + cx("thumbnail")}>
            <Image {...imageProps} width={60} height={60} />
          </div>
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
          <div className={"desktop " + cx("thumbnail")}>
            <Image {...imageProps} width={112} height={112} />
          </div>
        </div>
      </div>
    </Link>
  );
}
