import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import "react-notion-x/src/styles.css";

import MetaHead from "components/MetaHead";
import Head from "next/head";
import ExternalScript from "lib/client/ExternalScript";
import usePageviewEffect from "hooks/usePageviewEffect";
import useNProgressEffect from "hooks/useNProgressEffect";

function MyApp({ Component, pageProps }: AppProps) {
  usePageviewEffect();
  useNProgressEffect();

  return (
    <Layout>
      <Head>
        <meta
          name="naver-site-verification"
          content="3cb3706aca7852f4f54eb71aee714f7d96b53fd2"
        />
        <ExternalScript />
      </Head>
      <MetaHead />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
