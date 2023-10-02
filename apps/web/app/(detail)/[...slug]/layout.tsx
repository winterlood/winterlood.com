import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { fetchPage } from "util/fetch-page";

type Props = {
  children: ReactNode;
  params: { slug: string[] };
};

function getParams(params: Props["params"]) {
  const slug = params.slug;
  if (slug.length !== 2) {
    notFound();
  }

  const [category, id] = slug as [string, string];
  if (category !== "post" && category !== "qna") {
    notFound();
  }

  return { category, id };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = getParams(params);
  const { info } = await fetchPage(id);

  return {
    title: `${info.title} - Winterlood`,
    openGraph: {
      images: info.thumbnail,
    },
  };
}

export default async function Layout({ children, params }: Props) {
  return <>{children}</>;
}
