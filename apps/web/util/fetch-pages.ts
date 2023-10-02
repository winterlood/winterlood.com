import type { NotionPage } from "notion-api";

type Database = "POST" | "QNA";

const {
  NEXT_PUBLIC_NOTION_POST_DB_ID,
  NEXT_PUBLIC_NOTION_QNA_DB_ID,
} = process.env;

const dbIdMap: Record<Database, string> = {
  POST: NEXT_PUBLIC_NOTION_POST_DB_ID!,
  QNA: NEXT_PUBLIC_NOTION_QNA_DB_ID!,
};

export async function fetchPages(db: Database): Promise<
  | NotionPage[]
  | {
      blurDataURL: string | undefined;
      id: string;
      title: string;
      subtitle: string;
      tags: string[];
      createTime: string;
      cover: string;
      thumbnail: string;
    }[]
> {
  const res = await fetch(
    `${process.env.BASE_URL}/api/pages?db=${dbIdMap[db]}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) throw new Error("");

  return res.json();
}
