import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { officialClient } from "./client";
import { IPost } from "./types";
import { convertPostProperties } from "./convertPostProperties";

export const fetchPages = async (databaseID: string) => {
  try {
    const queryData = await officialClient.databases.query({
      database_id: databaseID,
    });
    const pages: IPost[] = queryData.results.map((it) => {
      const page = it as PageObjectResponse;
      return convertPostProperties(page);
    });
    return pages;
  } catch (err) {
    return null;
  }
};
