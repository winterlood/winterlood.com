import { notFound } from "next/navigation";
import { fetchPage as fetchNotionPage } from "notion-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("id가 존재하지 않습니다", { status: 400 });
  }

  try {
    const data = await fetchNotionPage(id);
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (err) {
    switch (err.code) {
      case "validation_error": {
        notFound();
        break;
      }
      default:
        return null;
    }
  }
}
