import { fetchPages } from "util/fetch-pages";
import Image from "next/image";
import QnaItem from "@/components/QnaItem";

export default async function Page() {
  const pages = await fetchPages("QNA");

  return (
    <main>
      {pages.map((page) => (
        <QnaItem key={page.id} {...page} />
      ))}
    </main>
  );
}
