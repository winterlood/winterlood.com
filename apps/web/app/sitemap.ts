import { fetchPages } from "util/fetch-pages";

const BASE_URL = process.env.BASE_URL;

export default async function sitemap() {
  const posts = (await fetchPages("POST")).map((page) => ({
    url: `${BASE_URL}/post/${page.id}`,
    lastModified: new Date(page.createTime).toISOString(),
  }));

  const qnas = (await fetchPages("QNA")).map((page) => ({
    url: `${BASE_URL}/qna/${page.id}`,
    lastModified: new Date(page.createTime).toISOString(),
  }));

  const routes = ["/about", "/post", "/qna", "/work"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date().toISOString(),
    })
  );

  const res = [...routes, ...posts, ...qnas].sort(
    (a, b) =>
      new Date(b.lastModified).getTime() -
      new Date(a.lastModified).getTime()
  );

  return res;
}
