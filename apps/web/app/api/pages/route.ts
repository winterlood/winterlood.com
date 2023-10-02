import { fetchPages as fetchNotionPages } from "notion-api";
import { retryer } from "util/retryer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const db = searchParams.get("db");

  if (!db) {
    return new Response("db가 존재하지 않습니다", { status: 400 });
  }

  const data = await retryer(() => fetchNotionPages(db));

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
