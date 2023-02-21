import jsIcon from "public/icon/icon-js.svg";
import tsIcon from "public/icon/icon-ts.svg";
import jsonIcon from "public/icon/icon-json.svg";

import Image from "next/image";
import { ReactElement } from "react";

interface IProps {
  type: "javascript" | "typescript" | "json";
}

const iconMap: Record<IProps["type"], any> = {
  javascript: jsIcon,
  typescript: tsIcon,
  json: jsonIcon,
};
export default function Icon({ type }: IProps) {
  return (
    <Image width={22} height={22} alt={`${type} icon`} src={iconMap[type]} />
  );
}
