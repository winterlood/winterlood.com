import { fetchPage } from "util/fetch-page";
import NotionRenderer from "@/components/NotionRenderer";
import { notFound, redirect } from "next/navigation";
import PostItem from "@/components/PostItem";
import { fetchPages } from "util/fetch-pages";
import QnaItem from "@/components/QnaItem";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

const allowSlugs = ["about", "post", "qna", "work"];

function getCurSlug(params: { slug: string[] }) {
  const slug = params.slug;

  if (slug.length > 1) {
    notFound();
  }

  const curSlug = slug[0];
  if (!allowSlugs.includes(curSlug)) {
    redirect("/about");
  }

  return curSlug.toUpperCase();
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const slug = getCurSlug(params);
  const fixedTitle = "Winterlood's Blog";
  let title = "";
  if (slug === "ABOUT") title = `${fixedTitle}`;
  else if (slug === "POST") title = `Posts - ${fixedTitle}`;
  else if (slug === "QNA") title = `Q&A - ${fixedTitle}`;
  else if (slug === "WORK") title = `Works - ${fixedTitle}`;

  return {
    title: title,
    description: "Winterlood's Blog",
    openGraph: {
      images: `${process.env.BASE_URL}/api/og?title=${title}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const slug = getCurSlug(params);

  if (slug === "ABOUT" || slug === "WORK") {
    const { recordMap } = await fetchPage(slug);
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
