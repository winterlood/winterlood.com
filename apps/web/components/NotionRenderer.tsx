"use client";
import { NotionRenderer as NRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

type Props = {
  recordMap: ExtendedRecordMap;
};

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.allSettled([
      import("prismjs/components/prism-javascript"),
      import("prismjs/components/prism-typescript"),
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-sass.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-scss.js"),
    ]);
    return m.Code;
  })
);

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then(
    (m) => m.Equation
  )
);
const Pdf = dynamic(
  () =>
    import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then((m) => {
      m.Modal.setAppElement(".notion-viewport");
      return m.Modal;
    }),
  {
    ssr: false,
  }
);

export default function NotionRenderer(props: Props) {
  return (
    <NRenderer
      darkMode={true}
      recordMap={props.recordMap}
      components={{
        nextImage: Image,
        nextLink: Link,
        Collection: null,
        Code,
        Equation,
        Pdf,
        Modal,
      }}
    />
  );
}
