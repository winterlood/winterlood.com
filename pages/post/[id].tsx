import { GetStaticProps, InferGetStaticPropsType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { getPostDetail } from "lib/server/notion";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import { ICodeBlock, IPost } from "types/global";
import style from "./[id].module.scss";
import classNames from "classnames/bind";
import MetaHead from "components/MetaHead";
import Utterances from "components/Utterances";
import dynamic from "next/dynamic";
import Ad from "components/Ad";

const DynamicCode = dynamic(() => import("components/Code"), {
  loading: () => <>코드를 불러오는 중 입니다 ...</>,
  ssr: false,
});
const cx = classNames.bind(style);

interface IProps {
  pageID: string;
  postInfo: IPost;
  postRecordMap: ExtendedRecordMap;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading</div>;
  }

  const {
    postInfo: { createTime, title, subtitle, cover },
    postRecordMap,
  } = props;

  return (
    <div className={cx("container")}>
      <MetaHead title={title} description={subtitle} thumbnail={cover} />
      {/* <Ad type={"NATIVE_INFEED"} /> */}
      <div className={cx("thubmnail_wrapper")}>
        {cover && (
          <div
            className={cx("thumbnail")}
            style={{ backgroundImage: `url(${cover})` }}
          ></div>
        )}
      </div>
      <div className={cx("header")}>
        <div className={cx("create_time")}>
          {new Date(createTime).toLocaleDateString()}
        </div>
        <div className={cx("title")}>{title}</div>
        <div className={cx("subtitle")}>{subtitle}</div>
      </div>
      <div className={cx("main")}>
        <NotionRenderer
          components={{
            Code: (e: ICodeBlock) => {
              return <DynamicCode {...e} />;
            },
          }}
          showTableOfContents={true}
          recordMap={postRecordMap}
        />
      </div>
      <Utterances />
      <div>
        <Ad type={"MULTIFLEX"} />
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

export const getStaticProps: GetStaticProps<IProps> = async (ctx) => {
  const { id } = ctx.params as IParams;
  const detailResponse = await getPostDetail(id);
  if (detailResponse) {
    const { postInfo, postRecordMap } = detailResponse;
    return {
      props: {
        pageID: id,
        postInfo,
        postRecordMap,
      },
      revalidate: 30,
    };
  } else {
    throw new Error();
  }
};
