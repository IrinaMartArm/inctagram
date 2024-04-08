const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
const nextConfig = {
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
};

module.exports = nextConfig;
