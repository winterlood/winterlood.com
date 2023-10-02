import { notFound } from "next/navigation";
import type { NotionPage } from "notion-api";
import type { ExtendedRecordMap } from "notion-types";

type Page = "ABOUT" | "WORK" | "NEWS" | string;

const {
  NEXT_PUBLIC_NOTION_ABOUT_PAGE_ID,
  NEXT_PUBLIC_NOTION_WORK_PAGE_ID,
  NEXT_PUBLIC_NOTION_NEWS_PAGE_ID,
} = process.env;

const pageIDMap: Record<Page, string> = {
  ABOUT: NEXT_PUBLIC_NOTION_ABOUT_PAGE_ID!,
  WORK: NEXT_PUBLIC_NOTION_WORK_PAGE_ID!,
  NEWS: NEXT_PUBLIC_NOTION_NEWS_PAGE_ID!,
};

export async function fetchPage(
  id: string
): Promise<{ info: NotionPage; recordMap: ExtendedRecordMap }> {
  const res = await fetch(
    `${process.env.BASE_URL}/api/page?id=${pageIDMap[id] || id}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (res.ok) return res.json();

  if (res.status === 404) {
    notFound();
  } else {
    throw new Error();
  }
}
