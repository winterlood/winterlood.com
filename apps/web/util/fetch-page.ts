import { retryer } from "util/retryer";
import { fetchPage as fetchNotionPage } from "notion-api";
import { cache } from "react";

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

export const fetchPage = cache(async function (page: Page) {
  console.log(`FETCH PAGE : ${page}`);
  const data = await retryer(() =>
    fetchNotionPage(pageIDMap[page] || page)
  );
  if (!data) throw new Error();
  return data;
});

export const revalidate = 5;
