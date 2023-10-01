import path from "path";
import withPlaiceholder from "@plaiceholder/next";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: false,
  transpilePackages: ["ui"],
  sassOptions: {
    includePaths: [path.join(__dirname, "./")],
    prependData: `@import "styles/variables.scss"; @import "styles/mixins.scss";`,
  },
  images: {
    domains: [
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
    ],
  },
};

export default withPlaiceholder(config);
