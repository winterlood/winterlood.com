import { ICodeBlock } from "types/global";
import style from "./Code.module.scss";
import classNames from "classnames/bind";

// syntax highlighter
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// codes
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";

// themes
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import Image from "next/image";
import Icon from "./Icon";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("c", c);

const cx = classNames.bind(style);

export default function Code(props: ICodeBlock) {
  const {
    block: {
      properties: { title, language, caption: blockCaption },
    },
  } = props;

  const code = title.map((it) => it.join("")).join("");
  const caption =
    blockCaption && blockCaption.map((it) => it.join("")).join("");
  const lang = language.at(0)?.at(0);

  const onClickCopyCode = () => {
    window.navigator.clipboard
      .writeText(code)
      .then(() => alert("복사 되었습니다 👍"));
  };

  return (
    <div className={cx("container")}>
      <div className={cx("top_bar")}>
        <div className={cx("left_wrapper")}>
          <div className={"icon_wrapper"}>
            {lang &&
              ["javascript", "typescript", "json"].includes(
                lang?.toLowerCase()
              ) && <Icon type={lang.toLowerCase() as "javascript"} />}
          </div>
          <div className={cx("code_caption")}>{caption}</div>
        </div>
        <div className={cx("copy_button")} onClick={onClickCopyCode}>
          Copy
        </div>
      </div>
      <SyntaxHighlighter
        style={oneDark}
        showLineNumbers={true}
        language={lang?.toLowerCase()}
        customStyle={{
          marginTop: "0px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        {code || ""}
      </SyntaxHighlighter>
    </div>
  );
}
