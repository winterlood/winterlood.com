import { Metadata } from "next";
import { ReactNode } from "react";
import type { PageCategory } from "types";
import { fetchPage } from "util/fetch-page";

type Props = {
  children: ReactNode;
  params: { category: PageCategory; id: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = params;
  const { info } = await fetchPage(id);

  return {
    title: `${info.title} - Winterlood`,
    description: `${info.title} - ${info.subtitle}`,
    openGraph: {
      images: `${process.env.BASE_URL}/api/og?title=${info.title}`,
    },
  };
}

export default async function Layout({ children }: Props) {
  return <div>{children}</div>;
}
