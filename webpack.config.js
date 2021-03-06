var webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./utils/env"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");

// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}
// popup: path.join(__dirname, "src", "js", "popup.js"),
// options: path.join(__dirname, "src", "js", "options.js"),

var options = {
  chromeExtensionBoilerplate: {
    notHotReload: ["popup"]
  },
  entry: {
    popup: "./src/js/popup.js",
    mousetrap: path.join(__dirname, "src", "js", "mousetrap.min.js")

  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/  }
    ],
    loaders: [
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=/images/[name].[ext]"}
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options.html"),
      filename: "options.html",
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"]
    }),
    new WriteFilePlugin()
  ]
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
