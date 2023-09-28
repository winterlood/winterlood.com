import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { IExtraPage, IPost } from "./types";
import { convertPostProperties } from "./convertPostProperties";

const DATABSE_ID = "f94efdd7b24b4a3fb62bfa4e43e0ee72";
const ABOUT_PAGE_ID = "e9bc2fceebd94f969636676128483dd2";

const api = new NotionAPI();

export const notionClient = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
});

export const getPostDetail = async (
  pageID: string
): Promise<
  { postInfo: IPost; postRecordMap: ExtendedRecordMap } | undefined
> => {
  try {
    const [pageQuery, recordMapQuery] = await Promise.allSettled([
      notionClient.pages.retrieve({
        page_id: pageID,
      }),
      api.getPage(pageID),
    ]);
    if (
      pageQuery.status === "fulfilled" &&
      recordMapQuery.status === "fulfilled"
    ) {
      const pageQueryData = pageQuery.value as PageObjectResponse;
      const recordMap = recordMapQuery.value;
      const pageInfo: IPost = convertPostProperties(pageQueryData);
      return {
        postInfo: pageInfo,
        postRecordMap: recordMap,
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPostList = async () => {
  try {
    const queryData = await notionClient.databases.query({
      database_id: DATABSE_ID,
    });

    const pages: IPost[] = queryData.results.map((it) => {
      const page = it as PageObjectResponse;
      return convertPostProperties(page);
    });

    return pages;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getRawPostList = async () => {
  try {
    const queryData = await notionClient.databases.query({
      database_id: DATABSE_ID,
    });

    return queryData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

type IExtraPageIDMap = {
  [key in IExtraPage]: string;
};

const extraPageIDMap: IExtraPageIDMap = {
  EXPERIENCE: "3804fb07262648edaad4b1cf0c55d011",
};

export const getExtraPageRecordMap = async (page: IExtraPage) => {
  try {
    const recordMap = await api.getPage(extraPageIDMap[page]);
    return recordMap;
  } catch (err) {
    console.error(err);
  }
};