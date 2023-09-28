import { officialClient, recordMapClient } from "./client";
import { ExtendedRecordMap } from "notion-types";
import { NotionPage } from "./types";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { convertPostProperties } from "./convertPostProperties";

export const fetchPage = async (
  pageID: string
): Promise<
  { info: NotionPage; recordMap: ExtendedRecordMap } | undefined
> => {
  try {
    const [pageQuery, recordMapQuery] = await Promise.allSettled([
      officialClient.pages.retrieve({
        page_id: pageID,
      }),
      recordMapClient.getPage(pageID),
    ]);
    if (
      pageQuery.status === "fulfilled" &&
      recordMapQuery.status === "fulfilled"
    ) {
      const pageQueryData = pageQuery.value as PageObjectResponse;
      const recordMap = recordMapQuery.value;
      const pageInfo: NotionPage =
        convertPostProperties(pageQueryData);

      return {
        info: pageInfo,
        recordMap: recordMap,
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error(err as string);
  }
};
