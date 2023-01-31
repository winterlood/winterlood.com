import { ICodeBlock } from "types/global";
import style from "./Code.module.scss";
import classNames from "classnames/bind";

// syntax highlighter
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// codes
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
// themes
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("c", c);

const cx = classNames.bind(style);

export default function Code({
  block: {
    properties: { title, language },
  },
}: ICodeBlock) {
  const code = title.at(0)?.at(0);
  const lang = language.at(0)?.at(0);

  return (
    <div className={cx("container")}>
      <SyntaxHighlighter
        style={oneDark}
        showLineNumbers={true}
        language={lang?.toLowerCase()}
      >
        {code || ""}
      </SyntaxHighlighter>
    </div>
  );
}
