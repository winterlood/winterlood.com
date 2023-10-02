import style from "./page.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Icon from "@/components/Icon";
import NotionRenderer from "@/components/NotionRenderer";
import { fetchPage } from "util/fetch-page";

const cx = classNames.bind(style);

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug;
  const [category, id] = slug as [string, string];

  const { info, recordMap } = await fetchPage(id);

  return (
    <div className={cx("container")}>
      <section className={cx("header")}>
        <Link href={`/${category}`}>
          <div className={cx("back")}>
            <Icon type="BACK" />
            <div>전체 {category === "post" ? "포스트" : "QNA"}</div>
          </div>
        </Link>
        <h1 className={cx("title")}>{info.title}</h1>
        <div className={cx("subtitle")}>{info.subtitle}</div>
        <div className={cx("date")}>
          {new Date(info.createTime).toLocaleDateString()} 작성
        </div>
        <div className={cx("tag_wrapper")}></div>
      </section>
      <article className={cx("article")}>
        <NotionRenderer recordMap={recordMap} />
      </article>
    </div>
  );
}
