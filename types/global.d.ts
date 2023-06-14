import { ReactElement } from "react";

interface ICodeBlock {
  block: {
    properties: {
      title: string[][];
      language: string[][];
      caption: string[][];
    };
  };
}

interface IPost {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  createTime: string;
  cover: string;
  [key: string]: string | string[];
}

type IExtraPage = "EXPERIENCE";

type IChildren = string | ReactElement | ReactElement[];
