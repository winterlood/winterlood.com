import { fetchPage } from "util/fetch-page";
import NotionRenderer from "@/components/NotionRenderer";

export default async function Page() {
  const { info, recordMap } = await fetchPage("WORK");

  return (
    <article>
      <NotionRenderer recordMap={recordMap} />
    </article>
  );
}
