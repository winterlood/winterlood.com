import NotionRenderer from "@/components/NotionRenderer";
import { fetchPage } from "util/fetch-page";
import style from "./page.module.scss";
import classNames from "classnames/bind";
import Icon from "@/components/Icon";
import Link from "next/link";
const cx = classNames.bind(style);

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return [];
}

export default async function Page({ params: { id } }: PageProps) {
  const { info, recordMap } = await fetchPage(id);

  return (
    <div className={cx("container")}>
      <section className={cx("header")}>
        <Link href={`/post`}>
          <div className={cx("back")}>
            <Icon type="BACK" />
            <div>전체 포스트</div>
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
