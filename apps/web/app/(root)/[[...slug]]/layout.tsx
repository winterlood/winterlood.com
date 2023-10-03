import classNames from "classnames/bind";
import style from "./layout.module.scss";
import Image from "next/image";
import Icon from "@/components/Icon";
import Menu from "@/components/(root)/Menu";
import Link from "next/link";

const cx = classNames.bind(style);

const snsList = [
  {
    key: "GITHUB",
    href: "https://github.com/winterlood",
  },
  {
    key: "TWITTER",
    href: "https://twitter.com/winterlood97",
  },
  {
    key: "LINKEDIN",
    href: "https://www.linkedin.com/in/%EC%A0%95%ED%99%98-%EC%9D%B4-5b234b194/",
  },
  {
    key: "INSTAGRAM",
    href: "https://www.instagram.com/winterlood/",
  },
] as const;

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
          <div className={cx("sns")}>
            {snsList.map((sns) => (
              <Link key={sns.key} target="_blank" href={sns.href}>
                <Icon type={sns.key} />
              </Link>
            ))}
          </div>
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
