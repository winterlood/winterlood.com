"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageViewCounter() {
  const pathname = usePathname();
  const [view, setView] = useState<number | undefined>();

  const fetchPageViewCount = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pageview${
      pathname ? `?path=${pathname}` : ""
    }`;
    const res = await fetch(url);

    if (res.ok) {
      const data: { path: string; pageView: string }[] =
        await res.json();

      setView(parseInt(data[0].pageView));
    }
  };

  useEffect(() => {
    if (pathname) {
      fetchPageViewCount();
    }
  }, [pathname]);

  return <>{view ? `${view} 조회` : "? 조회"} </>;
}
