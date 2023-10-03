import "./styles/globals.scss";
import "./styles/notion.css";
import type { Metadata } from "next";
import classNames from "classnames/bind";
import style from "./layout.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GARegister from "./GARegister";
import themeInitializer from "util/themeInitializer";
import NextTopLoader from "nextjs-toploader";

const cx = classNames.bind(style);

export const metadata: Metadata = {
  title: "Winterlood's",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="kr">
      <body className={cx("container")}>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializer,
          }}
        ></script>
        <GARegister />
        <NextTopLoader />
        <header className={cx("header")}>
          <div className={cx("header_inner")}>
            <Header />
          </div>
        </header>
        <main className={cx("main")}>{children}</main>
        <footer className={cx("footer")}>
          <div className={cx("footer_innner")}>
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  );
}
