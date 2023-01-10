import React from "react";

type ScriptType = "channelTalk" | "ga";
const scriptReducer = (type: ScriptType) => {
  switch (type) {
    case "ga":
      return `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GQ72JG3RFK');
      `;
    default:
      return ``;
  }
};

const ExternalScript = () => {
  return (
    <>
      {/* 구글 애널리틱스 */}
      {/*  eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GQ72JG3RFK"
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
