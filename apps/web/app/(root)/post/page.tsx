import { fetchPages } from "util/fetchPages";
import PostItem from "@/components/PostItem";

export default async function Page() {
  const pages = await fetchPages("POST");

  return (
    <div>
      {pages.map((page) => (
        <PostItem key={page.id} {...page} />
      ))}
    </div>
  );
}
