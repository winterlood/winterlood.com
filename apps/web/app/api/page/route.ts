import { fetchPage as fetchNotionPage } from "notion-api";
import { retryer } from "util/retryer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("id가 존재하지 않습니다", { status: 400 });
  }

  const data = await retryer(() => fetchNotionPage(id));

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
