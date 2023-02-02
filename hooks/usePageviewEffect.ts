import { useEffect } from "react";
import * as gtag from "lib/client/gtag";
import { useRouter } from "next/router";

export default function usePageviewEffect() {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
