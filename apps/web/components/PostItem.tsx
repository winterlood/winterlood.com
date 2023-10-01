import classNames from "classnames/bind";
import type { NotionPage } from "notion-api";
import Image from "next/image";
import style from "./PostItem.module.scss";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

const cx = classNames.bind(style);

export default async function PostItem(props: NotionPage) {
  const {
    id,
    title,
    subtitle,
    createTime,
    thumbnail,
    tags,
    blurDataURL,
  } = props;

  return (
    <Link href={"#"}>
      <div className={cx("container")}>
        <div className={"mobile " + cx("title")}>{title}</div>
        <div className={cx("container_inner")}>
          <div className={cx("info")}>
            <h3 className={"desktop " + cx("title")}>{title}</h3>
            <div className={cx("subtitle")}>{subtitle}</div>
            <div className={cx("createTime")}>
              {new Date(createTime).toLocaleDateString()}
            </div>
            <div className={cx("tag_wrapper")}>
              {tags.map((tag) => (
                <div key={`${id}-${tag}`} className={cx("tag")}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className={cx("thumbnail")}>
            {blurDataURL ? (
              <Image
                src={thumbnail}
                placeholder="blur"
                blurDataURL={(blurDataURL as string) || ""}
                alt={title}
                width={112}
                height={112}
              />
            ) : (
              <Image
                src={thumbnail}
                alt={title}
                width={112}
                height={112}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
