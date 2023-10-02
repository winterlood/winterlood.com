import { fetchPages } from "util/fetch-pages";
import Image from "next/image";

export default async function Page() {
  const pages = await fetchPages("QNA");

  return (
    <main>
      {pages.map((page) => (
        <div key={page.id}>
          <Image
            src={page.thumbnail}
            width={20}
            height={20}
            alt={page.title}
          />
        </div>
      ))}
    </main>
  );
}
