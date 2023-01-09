interface IPageProperty {
  title: string;
  tags: string[];
  createTime: string;
  lastUpdateTime: string;
}

interface IPageInfo {
  recordMap: ExtendedRecordMap;
  pageProperty: IPageProperty;
}
