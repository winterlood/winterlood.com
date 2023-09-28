import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPage } from "./types";

export const convertPostProperties = (
  page: PageObjectResponse
): NotionPage => {
  const { id, cover, created_time, properties } = page;

  const res: Partial<NotionPage> = {};
  Object.keys(properties).forEach((key) => {
    const property = properties[key];
    let value: string | string[] = "";
    switch (property.type) {
      case "title": {
        value = property.title.map((it) => it.plain_text).join(" ");
        break;
      }
      case "rich_text": {
        value = property.rich_text
          .map((it) => it.plain_text)
          .join(" ");
        break;
      }
      case "multi_select": {
        value = property.multi_select.map((it) => it.name);
        break;
      }
      case "files": {
        const curFile = property.files[0];
        value =
          curFile.type === "file"
            ? curFile.file.url
            : curFile.type === "external"
            ? curFile.external.url
            : "";
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
    thumbnail: res.thumbnail || "",
  };
};
