import { fetchPages } from "util/fetch-pages";

const BASE_URL = process.env.BASE_URL;

export default async function sitemap() {
  const routes = ["/about", "/post", "/qna", "/work"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date().toISOString(),
    })
  );

  try {
    const [postRes, qnaRes] = await Promise.all([
      fetchPages("POST"),
      fetchPages("QNA"),
    ]);

    const posts = postRes.map((page) => ({
      url: `${BASE_URL}/post/${page.id}`,
      lastModified: new Date(page.createTime).toISOString(),
    }));

    const qnas = qnaRes.map((page) => ({
      url: `${BASE_URL}/qna/${page.id}`,
      lastModified: new Date(page.createTime).toISOString(),
    }));

    console.log(posts, qnas);

    const res = [...routes, ...posts, ...qnas].sort(
      (a, b) =>
        new Date(b.lastModified).getTime() -
        new Date(a.lastModified).getTime()
    );
    return res;
  } catch (e) {
    console.error(e);
    return routes;
  }
}
