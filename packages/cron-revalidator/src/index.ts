import Sitemapper from "sitemapper";

const BASE_URL = "https://winterlood.com";

async function main() {
  const sitemap = new Sitemapper({});
  const sites = await sitemap
    .fetch(`${BASE_URL}/sitemap.xml`)
    .then(({ sites }) => sites);

  const paths = sites.map((site) => {
    return site.split(BASE_URL)[1];
  });

  for (let path of paths) {
    const res = await fetch(
      `${BASE_URL}/api/revalidate?path=${path}`
    );

    if (res.ok) {
      const resJson = await res.json();
      console.log({ path, ...resJson });
    } else {
      console.error({ path, status: res.status });
    }
  }
}

main();
