const configOverride = require("./config-overrides");
module.exports = {
  outputDir: "build",
  publicPath: "/",
  configureWebpack: (config) => {
    configOverride(config);
  },
};
