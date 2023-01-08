import { GetStaticProps, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { getPageDetailInfo } from "lib/server/notion";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";

interface IProps {
  pageID: string;
  pageInfo: IPageInfo;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function Page({ pageID, pageInfo }: IProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading</div>;
  }

  const {
    recordMap,
    pageProperty: { title, tags, createTime },
  } = pageInfo;

  return (
    <div>
      게시글 아이디 : {pageID}
      <div>{title}</div>
      <div>{tags.join(" ")}</div>
      <div>{new Date(createTime).toLocaleDateString()}</div>
      <div>
        <NotionRenderer
          showTableOfContents={true}
          darkMode={false}
          previewImages={true}
          recordMap={recordMap}
        />
      </div>
    </div>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as IParams;

  const pageInfo = await getPageDetailInfo(id);

  return {
    props: {
      pageID: id,
      pageInfo,
    },
    revalidate: 30,
  };
};
