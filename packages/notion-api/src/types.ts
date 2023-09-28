import { ReactElement } from "react";

export interface NotionCodeBlock {
  block: {
    properties: {
      title: string[][];
      language: string[][];
      caption: string[][];
    };
  };
}

export interface NotionPage {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  createTime: string;
  cover: string;
  thumbnail: string;
  [key: string]: string | string[];
}
