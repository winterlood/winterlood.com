import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import * as notionUtils from "notion-utils";

const api = new NotionAPI();

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

export const getPostRecordMap = async (pageID: string) => {
  try {
    const recordMap = await api.getPage(pageID);
    return recordMap;
  } catch (err) {
    return null;
  }
};

export const getPostRawRecordMap = async (pageID: string) => {
  try {
    const res = await api.getPageRaw(pageID);
    return res;
  } catch (err) {
    return null;
  }
};

export const getPageTitle = async (recordMap: ExtendedRecordMap) => {
  try {
    const res = await notionUtils.getPageTitle(recordMap);
    return res;
  } catch (err) {
    return null;
  }
};
