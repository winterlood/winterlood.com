import style from "./page.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Icon from "@/components/Icon";
import NotionRenderer from "@/components/NotionRenderer";
import { fetchPage } from "util/fetch-page";
import { PageCategory } from "types";
import PageViewCounter from "@/components/(detail)/PageViewCounter";

const cx = classNames.bind(style);

type Props = {
  params: { category: PageCategory; id: string };
};

export default async function Page({ params }: Props) {
  const { category, id } = params;
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
          <span>
            <PageViewCounter />
          </span>
          <div className={cx("sep")}></div>
          <span>
            {new Date(info.createTime).toLocaleDateString()} 작성
          </span>
        </div>
        <div className={cx("date")}></div>
        <div className={cx("tag_wrapper")}></div>
      </section>
      <article className={cx("article")}>
        <NotionRenderer recordMap={recordMap} />
      </article>
    </div>
  );
}
