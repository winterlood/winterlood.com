import classNames from "classnames/bind";
import PostItem from "components/PostItem";
import { getPostList } from "lib/server/notion";
import { GetServerSideProps } from "next";
import { IPost } from "types/global";
import style from "./index.module.scss";
const cx = classNames.bind(style);

interface IProps {
  postList: IPost[];
}

export default function Page({ postList }: IProps) {
  return (
    <div className={cx("container")}>
      {postList.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postList = await getPostList();
  return {
    props: {
      postList,
    },
  };
};
