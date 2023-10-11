// src/client.ts
import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client";
var recordMapClient = new NotionAPI();
var officialClient = new Client({
  auth: process.env.NOTION_AUTH_TOKEN
});

// src/convertPostProperties.ts
var convertPostProperties = (page) => {
  const { id, cover, created_time, properties } = page;
  const res = {};
  Object.keys(properties).forEach((key) => {
    const property = properties[key];
    let value = "";
    switch (property.type) {
      case "title": {
        value = property.title.map((it) => it.plain_text).join(" ");
        break;
      }
      case "rich_text": {
        value = property.rich_text.map((it) => it.plain_text).join(" ");
        break;
      }
      case "multi_select": {
        value = property.multi_select.map((it) => it.name);
        break;
      }
      case "files": {
        const curFile = property.files[0];
        value = curFile.type === "file" ? curFile.file.url : curFile.type === "external" ? curFile.external.url : "";
      }
    }
    res[key] = value;
  });
  if (cover?.type === "external") {
    res["cover"] = cover.external.url;
  } else if (cover?.type === "file") {
    res["cover"] = cover.file.url;
  }
  return {
    id,
    title: res.title || "",
    subtitle: res.subtitle || "",
    tags: res.tags || [],
    cover: res.cover || "",
    createTime: created_time,
    thumbnail: res.thumbnail || ""
  };
};

// src/fetchPages.ts
import { getPlaiceholder } from "plaiceholder";
async function getPlaceholders(src) {
  try {
    const buffer = await fetch(src).then(
      async (res) => Buffer.from(await res.arrayBuffer())
    );
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (err) {
    err;
  }
}
var fetchPages = async (databaseID) => {
  const queryData = await officialClient.databases.query({
    database_id: databaseID
  });
  const pages = queryData.results.map((it) => {
    const rawPage = it;
    const page = convertPostProperties(rawPage);
    return page;
  });
  const placeholders = await Promise.all(
    pages.map(async (pages2) => ({
      id: pages2.id,
      blurDataURL: await getPlaceholders(pages2.thumbnail)
    }))
  );
  return pages.map((page) => ({
    ...page,
    blurDataURL: placeholders.find((it) => it.id === page.id)?.blurDataURL
  }));
};

// src/fetchPage.ts
var fetchPage = async (pageID) => {
  const [pageQuery, recordMapQuery] = await Promise.allSettled([
    officialClient.pages.retrieve({
      page_id: pageID
    }),
    recordMapClient.getPage(pageID)
  ]);
  if (pageQuery.status === "fulfilled" && recordMapQuery.status === "fulfilled") {
    const pageQueryData = pageQuery.value;
    const recordMap = recordMapQuery.value;
    const pageInfo = convertPostProperties(pageQueryData);
    return {
      info: pageInfo,
      recordMap
    };
  } else {
    const rejectedPageQuery = pageQuery;
    const error = new Error(rejectedPageQuery.reason);
    error.code = rejectedPageQuery.reason.code;
    throw error;
  }
};
export {
  fetchPage,
  fetchPages
};
