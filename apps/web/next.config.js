const path = require("path");

module.exports = {
  reactStrictMode: false,
  transpilePackages: ["ui"],
  sassOptions: {
    includePaths: [path.join(__dirname, "./")],
    prependData: `@import "styles/variables.scss"; @import "styles/mixins.scss";`, // prependData 옵션 추가
  },
};
