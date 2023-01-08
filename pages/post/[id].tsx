import { GetStaticProps, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface IProps {
  pageID: string;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: IProps) {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>loading</div>;
  }

  return <div>게시글 아이디 : {id}</div>;
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = (ctx) => {
  const { id } = ctx.params as IParams;
  return {
    props: {
      pageID: id,
    },
    revalidate: 30,
  };
};
