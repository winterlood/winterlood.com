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
  env: {
    BASE_URL: process.env.BASE_URL,
    NOTION_AUTH_TOKEN: process.env.NOTION_AUTH_TOKEN,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
};

module.exports = nextConfig;
