import { useEffect } from "react";

export default function useAdEffect() {
  useEffect(() => {
    let ads = document.getElementsByClassName("adsbygoogle").length;
    for (let i = 0; i < ads; i++) {
      try {
        // @ts-ignore
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
}
