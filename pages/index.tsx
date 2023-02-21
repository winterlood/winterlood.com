import style from "./index.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import winterlood from "public/image/winterlood.png";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ExtendedRecordMap } from "notion-types";
import { getExtraPageRecordMap, getPostList } from "lib/server/notion";
import { NotionRenderer } from "react-notion-x";
import { IPost } from "types/global";
import PostItem from "components/PostItem";

const cx = classNames.bind(style);

interface IProps {
  newsRecordMap: ExtendedRecordMap | undefined;
  postList: IPost[];
}

const CONTACT_CHANNEL_LIST = [
  {
    channelName: "Github",
    channelUrl: "https://github.com/winterlood",
  },
  {
    channelName: "Twitter",
    channelUrl: "https://twitter.com/winterlood97",
  },
  {
    channelName: "Email",
    channelUrl: "mailto:king199777@gmail.com",
  },
  {
    channelName: "LinkedIn",
    channelUrl:
      "https://www.linkedin.com/in/%EC%A0%95%ED%99%98-%EC%9D%B4-5b234b194/",
  },
  {
    channelName: "Inflearn",
    channelUrl: "https://www.inflearn.com/users/@winterlood",
  },
  {
    channelName: "Udemy",
    channelUrl: "https://www.udemy.com/user/ijeonghwan-13/",
  },
];

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={cx("container")}>
      <section className={cx("section_profile")}>
        <div className={cx("avatar_row")}>
          <div className={cx("avatar_box")}>
            <Image fill={true} src={winterlood} alt={"winterlood"} />
          </div>
        </div>
        <div className={cx("meta_info")}>
          <div className={cx("name")}>이정환 </div>
          <div className={cx("aka")}>@winterlood</div>
        </div>
        <div className={cx("descript")}>Product Oriented SW Engineer</div>
        <div className={cx("contact_item_list")}>
          {CONTACT_CHANNEL_LIST.map((it) => (
            <span key={`channel-${it.channelName}`}>
              <a href={it.channelUrl} target={"_blank"} rel="noreferrer">
                {it.channelName}
              </a>
            </span>
          ))}
        </div>
      </section>

      {props.newsRecordMap && (
        <section className={cx("section_news")}>
          <div className={cx("header")}>News</div>
          <div className={cx("record_map_wrapper")}>
            <NotionRenderer recordMap={props.newsRecordMap} />
          </div>
        </section>
      )}
      <section className={cx("section_post")}>
        <div className={cx("header")}>Posts</div>
        <div className={cx("post_list_wrapper")}>
          {props.postList.map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const [newsResult, postResult] = await Promise.allSettled([
    getExtraPageRecordMap("NEWS"),
    getPostList(),
  ]);

  return {
    props: {
      newsRecordMap:
        newsResult.status === "fulfilled" ? newsResult.value : undefined,
      postList: postResult.status === "fulfilled" ? postResult.value || [] : [],
    },
    revalidate: 5,
  };
};

export default Home;
