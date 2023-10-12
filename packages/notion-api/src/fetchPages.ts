import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { officialClient } from "./client";
import { NotionPage } from "./types";
import { convertPostProperties } from "./convertPostProperties";
import { getPlaiceholder } from "plaiceholder";

async function getPlaceholders(src: string) {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (err) {
    err;
  }
}

export const fetchPages = async (databaseID: string) => {
  const queryData = await officialClient.databases.query({
    database_id: databaseID,
  });

  const pages: NotionPage[] = queryData.results.map((it) => {
    const rawPage = it as PageObjectResponse;
    const page = convertPostProperties(rawPage);
    return page;
  });

  const placeholders = await Promise.all(
    pages.map(async (pages) => ({
      id: pages.id,
      blurDataURL: await getPlaceholders(pages.thumbnail),
    }))
  );

  return pages.map((page) => ({
    ...page,
    blurDataURL: placeholders.find((it) => it.id === page.id)
      ?.blurDataURL,
  }));
};
