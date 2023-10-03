"use client";

import { pageview } from "util/gtag";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageViewController(props: {
  pageTitle: string;
}) {
  const { pageTitle } = props;
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);

    if (props) {
      pageview({
        pagePath: pathname,
        pageTitle,
      });
    }
  }, [props]);
  return null;
}
