/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    incluedPaths: [path.join(__dirname, "styles")],
    prependData: [
      `@import '/styles/typho.scss';`,
      `@import '/styles/color.scss';`,
      `@import '/styles/mixin.scss';`,
    ].join(" "),
  },
};

module.exports = nextConfig;
