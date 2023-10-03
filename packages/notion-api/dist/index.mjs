// src/index.ts
import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client";

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
    }
    res[key] = value;
  });
  if ((cover == null ? void 0 : cover.type) === "external") {
    res["cover"] = cover.external.url;
  } else if ((cover == null ? void 0 : cover.type) === "file") {
    res["cover"] = cover.file.url;
  }
  return {
    id,
    title: res.title || "",
    subtitle: res.subtitle || "",
    tags: res.tags || [],
    cover: res.cover || "",
    createTime: created_time
  };
};

// src/index.ts
var DATABSE_ID = "f94efdd7b24b4a3fb62bfa4e43e0ee72";
var api = new NotionAPI();
var notionClient = new Client({
  auth: process.env.NOTION_AUTH_TOKEN
});
var fetchPostRecordMap = async (pageID) => {
  try {
    const [pageQuery, recordMapQuery] = await Promise.allSettled([
      notionClient.pages.retrieve({
        page_id: pageID
      }),
      api.getPage(pageID)
    ]);
    if (pageQuery.status === "fulfilled" && recordMapQuery.status === "fulfilled") {
      const pageQueryData = pageQuery.value;
      const recordMap = recordMapQuery.value;
      const pageInfo = convertPostProperties(pageQueryData);
      return {
        postInfo: pageInfo,
        postRecordMap: recordMap
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
  }
};
var fetchPosts = async () => {
  try {
    const queryData = await notionClient.databases.query({
      database_id: DATABSE_ID
    });
    const pages = queryData.results.map((it) => {
      const page = it;
      return convertPostProperties(page);
    });
    return pages;
  } catch (err) {
    console.log(err);
    return null;
  }
};
var fetchRawPosts = async () => {
  try {
    const queryData = await notionClient.databases.query({
      database_id: DATABSE_ID
    });
    return queryData;
  } catch (err) {
    console.log(err);
    return null;
  }
};
var extraPageIDMap = {
  EXPERIENCE: "3804fb07262648edaad4b1cf0c55d011"
};
var fetchPageByID = async (page) => {
  try {
    const recordMap = await api.getPage(extraPageIDMap[page]);
    return recordMap;
  } catch (err) {
    console.error(err);
  }
};
export {
  fetchPageByID,
  fetchPostRecordMap,
  fetchPosts,
  fetchRawPosts
};
