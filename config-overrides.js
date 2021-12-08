/* config-overrides.js */
const path = require("path");
const fs = require("fs");
const VersionFile = require("webpack-version-file");
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appBuild = resolveApp("build");
const appPackageJson = resolveApp("package.json");
const appPath = resolveApp(".");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.plugins.push(
    new VersionFile({
      output: path.join(appBuild, "/version.json"),
      package: appPackageJson,
      template: path.join(appPath, "./version.ejs"),
      data: {
        buildAt: new Date().toISOString(),
        buildEnv: process.env.REACT_APP_ENV,
      },
    })
  );
  return config;
};
