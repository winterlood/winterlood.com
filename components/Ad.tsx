import useAdEffect from "hooks/useAdEffect";
import { useEffect } from "react";

interface IProps {
  type: "MULTIFLEX" | "NATIVE_INFEED";
}
export default function Ad({ type }: IProps) {
  useAdEffect();
  switch (type) {
    case "MULTIFLEX":
      return (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
          }}
          data-ad-client={process.env.GOOGLE_AD_CLIENT}
          data-ad-format="autorelaxed"
          data-ad-slot="2145929376"
          data-full-width-responsive="true"
        />
      );
    case "NATIVE_INFEED":
      return (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
          }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client={process.env.GOOGLE_AD_CLIENT}
          data-ad-slot="1922885328"
        ></ins>
      );
    default:
      return null;
  }
}
