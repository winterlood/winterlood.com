import { fetchPage } from "util/fetch-page";
import NotionRenderer from "@/components/NotionRenderer";
import { notFound } from "next/navigation";
import PostItem from "@/components/PostItem";
import { fetchPages } from "util/fetch-pages";
import QnaItem from "@/components/QnaItem";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

const allowSlugs = ["post", "qna", "work"];

function getCurSlug(params: { slug: string[] }) {
  const slug = params.slug;
  if (!slug) {
    return "ABOUT";
  }
  if (slug.length > 1) {
    notFound();
  }

  const curSlug = slug[0] || "ABOUT";
  if (!allowSlugs.includes(curSlug)) {
    notFound();
  }

  return curSlug.toUpperCase();
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const slug = getCurSlug(params);
  return {
    title: `Winterlood's`,
  };
}

export default async function Page({ params }: Props) {
  const slug = getCurSlug(params);

  if (slug === "ABOUT" || slug === "WORK") {
    const { info, recordMap } = await fetchPage(slug);
    return <NotionRenderer recordMap={recordMap} />;
  }

  if (slug === "POST" || slug === "QNA") {
    const pages = await fetchPages(slug);
    return pages.map((page) => {
      return slug === "POST" ? (
        <PostItem key={page.id} {...page} />
      ) : (
        <QnaItem key={page.id} {...page} />
      );
    });
  }

  notFound();
}
