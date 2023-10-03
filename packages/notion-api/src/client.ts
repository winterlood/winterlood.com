import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client";

const recordMapClient = new NotionAPI();

const officialClient = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
});

export { officialClient, recordMapClient };
