import { fetchPages } from "util/fetch-pages";
import PostItem from "@/components/PostItem";
import { retryer } from "util/retryer";

export default async function Page() {
  // const pages = await fetchPages("POST");

  const pages = await fetchPages("POST");

  return (
    <div>
      {pages.map((page) => (
        <PostItem key={page.id} {...page} />
      ))}
    </div>
  );
}
