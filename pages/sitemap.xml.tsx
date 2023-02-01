import { getPostList } from "lib/server/notion";
import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { IPost } from "types/global";

export default function Sitemap() {}

const createSitemap = (posts: IPost[]) =>
  posts.map((post) => ({
    loc: `https://winterlood.com/post/${post.id}`,
    lastmod: new Date(post.createTime).toISOString(),
  }));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await getPostList();
  return getServerSideSitemap(ctx, createSitemap(posts || []));
};
