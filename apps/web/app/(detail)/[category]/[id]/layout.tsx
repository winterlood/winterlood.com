import { Metadata } from "next";
import { ReactNode } from "react";
import type { PageCategory } from "types";
import { fetchPage } from "util/fetch-page";
import { getMetaTag } from "util/metatag";

type Props = {
  children: ReactNode;
  params: { category: PageCategory; id: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category, id } = params;
  const { info } = await fetchPage(id);

  const title = `${category === "qna" ? "Q. " : ""}${
    info.title
  } - Winterlood`;
  const description = `${info.title} - ${info.subtitle}`;

  return getMetaTag({
    url: `${process.env.BASE_URL}/${category}/${id}`,
    title,
    description,
    ogImageTitle: `${category === "qna" ? "Q. " : ""}${info.title}`,
  });
}

export default async function Layout({ children }: Props) {
  return <div>{children}</div>;
}
