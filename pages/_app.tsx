import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import "react-notion-x/src/styles.css";
import { useEffect } from "react";
import { Router } from "next/router";

import "nprogress/nprogress.css";
import NProgress from "nprogress";
import MetaHead from "components/MetaHead";
import Head from "next/head";
import ExternalScript from "lib/client/ExternalScript";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  return (
    <Layout>
      <Head>
        <ExternalScript />
      </Head>
      <MetaHead />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
