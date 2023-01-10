import classNames from "classnames/bind";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import style from "./about.module.scss";
import { ExtendedRecordMap } from "notion-types";
import { getExtraPageRecordMap } from "lib/server/notion";
import { NotionRenderer } from "react-notion-x";
const cx = classNames.bind(style);

interface IProps {
  recordMap: ExtendedRecordMap;
}

export default function AboutPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <div className={cx("container")}>
      <NotionRenderer recordMap={props.recordMap} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const recordMap = await getExtraPageRecordMap("about");

  if (!recordMap) {
    throw new Error("record map is null");
  }

  return {
    props: {
      recordMap: recordMap,
    },
  };
};
