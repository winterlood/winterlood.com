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
var fetchPages = async (databaseID) => {
  try {
    const queryData = await officialClient.databases.query({
      database_id: databaseID
    });
    const pages = queryData.results.map((it) => {
      const page = it;
      return convertPostProperties(page);
    });
    return pages;
  } catch (err) {
    return null;
  }
};

// src/fetchPage.ts
var fetchPage = async (pageID) => {
  try {
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
      throw new Error();
    }
  } catch (err) {
    throw new Error(err);
  }
};
export {
  fetchPage,
  fetchPages
};
