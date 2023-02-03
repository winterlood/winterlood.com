import React from "react";

type ScriptType = "channelTalk" | "ga";
const scriptReducer = (type: ScriptType) => {
  switch (type) {
    case "ga":
      return `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', ${process.env.GA_TRACKING_ID});
      `;
    default:
      return ``;
  }
};

const ExternalScript = () => {
  return (
    <>
      {/* 구글 애드센스 */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8356725717508400"
        //@ts-ignore
        crossorigin="anonymous"
      ></script>
      {/* 구글 애널리틱스 */}
      {/*  eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: scriptReducer("ga"),
        }}
      />
    </>
  );
};

export default ExternalScript;
