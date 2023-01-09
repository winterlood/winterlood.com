import classNames from "classnames/bind";
import { ReactElement } from "react";
import Footer from "./Footer";
import Header from "./Header";
import style from "./Layout.module.scss";
const cx = classNames.bind(style);

interface IProps {
  children: ReactElement | ReactElement[];
}

export default function Layout({ children }: IProps) {
  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <Header />
      </header>
      <main className={cx("main")}>{children}</main>
      <footer className={cx("footer")}>
        <Footer />
      </footer>
    </div>
  );
}
