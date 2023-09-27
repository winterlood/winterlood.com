import classNames from "classnames/bind";
import style from "./layout.module.scss";
import Image from "next/image";
import Icon from "@/components/Icon";
import Menu from "@/components/(root)/Menu";

const cx = classNames.bind(style);

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className={cx("container")}>
      <section className={cx("header")}>
        <div className={cx("profile_img")}>
          <Image
            alt="winterlood 프로필 사진"
            src={"/profile.png"}
            layout="fill"
          />
        </div>
        <div className={cx("profile_info")}>
          <div className={cx("name")}>이정환 | Winterlood</div>
          <div className={cx("descript")}>king199777@gmail.com</div>
        </div>
      </section>
      <section className={cx("bio")}>
        <Icon type="QUOTE" />
        무엇이든 쉽게 설명할 방법은 분명히 있다
      </section>
      <section className={cx("menu")}>
        <Menu />
      </section>
      <section className={cx("main")}>{children}</section>
    </section>
  );
}
