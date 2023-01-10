import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import * as notionUtils from "notion-utils";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { IPageInfo, IPageProperty, IPost } from "types/global";

const DATABSE_ID = "4baff6ea-b6e1-43d1-bfe1-22193c2ee0fd";
const VIEW_ID = "3a8d2d17-a6c1-4cab-9314-9a564f492f20";

const api = new NotionAPI();

export const notionClient = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
});

const getPageProperty = (
  propertyName: string,
  parsedPageID: string,
  recordMap: ExtendedRecordMap
) => {
  const propertyValue = notionUtils.getPageProperty(
    propertyName,
    recordMap.block[parsedPageID as string].value,
    recordMap
  );
  return propertyValue;
};

export const getPageDetailInfo = async (pageID: string): Promise<IPageInfo> => {
  try {
    // Step1. 레코드맵 불러오기
    const recordMap = await api.getPage(pageID);

    // Step2. 페이지 ID 파싱
    const parsedPageID = notionUtils.parsePageId(pageID);

    // Step2. 페이지 프로퍼티 불러오기
    const pageProperty: IPageProperty = {
      title: getPageProperty("title", parsedPageID, recordMap) as string,
      subtitle: getPageProperty("subtitle", parsedPageID, recordMap) as string,
      tags: getPageProperty("tags", parsedPageID, recordMap) as string[],
      createTime: getPageProperty(
        "createTime",
        parsedPageID,
        recordMap
      ) as string,
      lastUpdateTime: getPageProperty(
        "lastUpdateTime",
        parsedPageID,
        recordMap
      ) as string,
    };

    return {
      recordMap,
      pageProperty,
    };
  } catch (err) {
    console.error(err);
  }

  return {
    recordMap: {} as ExtendedRecordMap,
    pageProperty: {} as IPageProperty,
  };
};

export const getPostList = async () => {
  try {
    const queryData = await notionClient.databases.query({
      database_id: "f94efdd7b24b4a3fb62bfa4e43e0ee72",
    });

    // Step2. 페이지 프로퍼티 불러오기
    const pages: IPost[] = queryData.results.map((it) => {
      const page = it as PageObjectResponse;
      return {
        id: page.id,
        // @ts-ignore
        title: page.properties.title.title.map((it) => it.plain_text).join(" "),
        // @ts-ignore
        subtitle: page.properties.subtitle[page.properties.subtitle.type]
          .map((it: { plain_text: string }) => it.plain_text)
          .join(" "),
        // @ts-ignore
        cover: page.cover && page.cover[page.cover.type].url,
        // @ts-ignore
        tags: page.properties.tags.multi_select.map((it) => it.name),
        createTime: page.created_time,
      };
    });

    return pages;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// export const getPostRecordMap = async (pageID: string) => {
//   try {
//     const recordMap = await api.getPage(pageID);
//     return recordMap;
//   } catch (err) {
//     return null;
//   }
// };

// export const getPostRawRecordMap = async (pageID: string) => {
//   try {
//     const res = await api.getPageRaw(pageID);
//     return res;
//   } catch (err) {
//     return null;
//   }
// };

// export const getPageTitle = async (recordMap: ExtendedRecordMap) => {
//   try {
//     const res = await notionUtils.getPageTitle(recordMap);
//     return res;
//   } catch (err) {
//     return null;
//   }
// };
