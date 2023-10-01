import { fetchPage as fetchNotionPage } from "notion-api";

type Page = "ABOUT" | "WORK" | "NEWS";

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

export async function fetchPage(page: Page) {
  const data = await fetchNotionPage(pageIDMap[page]);
  if (!data) throw new Error();
  return data;
}
