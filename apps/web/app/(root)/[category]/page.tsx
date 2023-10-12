import { fetchPage } from "util/fetch-page";
import NotionRenderer from "@/components/NotionRenderer";
import { notFound, redirect } from "next/navigation";
import PostItem from "@/components/PostItem";
import { fetchPages } from "util/fetch-pages";
import QnaItem from "@/components/QnaItem";
import { Metadata } from "next";
import Skeleton from "react-loading-skeleton";
import { getMetaTag } from "util/metatag";

type Props = {
  params: { category: string };
};

const allowCategories = ["about", "post", "qna", "work"];

export async function generateMetadata({
  params: { category },
}: Props): Promise<Metadata> {
  if (!allowCategories.includes(category)) {
    redirect("/about");
  }

  const upperCaseCategory = category.toUpperCase();

  const fixedTitle = "이정환 블로그";
  let title = "";
  if (upperCaseCategory === "ABOUT") title = `${fixedTitle}`;
  else if (upperCaseCategory === "POST")
    title = `Posts - ${fixedTitle}`;
  else if (upperCaseCategory === "QNA") title = `Q&A - ${fixedTitle}`;
  else if (upperCaseCategory === "WORK")
    title = `Works - ${fixedTitle}`;

  return getMetaTag({
    url: `${process.env.BASE_URL}/${category}`,
    title,
    imageUrl: `${
      process.env.BASE_URL
    }/api/og?title=${encodeURIComponent(
      "무엇이든 쉽게 설명할 방법은 있다"
    )}`,
  });
}

export default async function Page({ params: { category } }: Props) {
  const upperCaseCategory = category.toUpperCase();

  if (upperCaseCategory === "ABOUT" || upperCaseCategory === "WORK") {
    const { recordMap } = await fetchPage(upperCaseCategory);
    return <NotionRenderer recordMap={recordMap} />;
  }

  if (upperCaseCategory === "POST" || upperCaseCategory === "QNA") {
    const pages = await fetchPages(upperCaseCategory);
    return pages.map((page) => {
      return upperCaseCategory === "POST" ? (
        <PostItem key={page.id} {...page} />
      ) : (
        <QnaItem key={page.id} {...page} />
      );
    });
  }

  notFound();
}
