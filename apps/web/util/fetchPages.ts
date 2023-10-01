import { fetchPages as fetchNotionPages } from "notion-api";

type Database = "POST" | "QNA";

const {
  NEXT_PUBLIC_NOTION_POST_DB_ID,
  NEXT_PUBLIC_NOTION_QNA_DB_ID,
} = process.env;

const dbIdMap: Record<Database, string> = {
  POST: NEXT_PUBLIC_NOTION_POST_DB_ID!,
  QNA: NEXT_PUBLIC_NOTION_QNA_DB_ID!,
};

export async function fetchPages(db: Database) {
  const data = await fetchNotionPages(dbIdMap[db]);
  if (!data) throw new Error();
  return data;
}
