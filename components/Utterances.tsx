export default function Utterances() {
  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.setAttribute("repo", "winterlood/winterlood.com");
        scriptElem.setAttribute("issue-term", "title");
        scriptElem.setAttribute("label", "blog-comment");
        scriptElem.setAttribute("theme", "github-light");
        scriptElem.crossOrigin = "anonymous";
        elem.appendChild(scriptElem);
      }}
    />
  );
}
