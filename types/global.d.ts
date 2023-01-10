import { ReactElement } from "react";

interface IPost {
  id: string;
  title: string;
  cover: string;
  tags: string[];
  createTime: string;
  subtitle: string;
}

interface IPageProperty {
  title: string;
  tags: string[];
  createTime: string;
  lastUpdateTime: string;
  subtitle: string;
}

interface IPageInfo {
  recordMap: ExtendedRecordMap;
  pageProperty: IPageProperty;
}

type IChildren = string | ReactElement | ReactElement[];
