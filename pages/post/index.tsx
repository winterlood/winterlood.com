import classNames from "classnames/bind";
import PostItem from "components/PostItem";
import { getPostList } from "lib/server/notion";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IPost } from "types/global";
import style from "./index.module.scss";
const cx = classNames.bind(style);

interface IProps {
  postList: IPost[];
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { postList } = props;
  return (
    <div className={cx("container")}>
      {postList.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const postList = await getPostList();
  return {
    props: {
      postList: postList || [],
    },
    revalidate: 1,
  };
};
