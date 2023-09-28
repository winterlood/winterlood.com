import { ReactElement } from "react";

export interface ICodeBlock {
  block: {
    properties: {
      title: string[][];
      language: string[][];
      caption: string[][];
    };
  };
}

export interface IPost {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  createTime: string;
  cover: string;
  thumbnail: string;
  [key: string]: string | string[];
}

export type IChildren = string | ReactElement | ReactElement[];
