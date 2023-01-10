import { ReactElement } from "react";

interface IPost {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  createTime: string;
  cover: string;
  [key: string]: string | string[];
}

type IExtraPage = "NEWS";

type IChildren = string | ReactElement | ReactElement[];
