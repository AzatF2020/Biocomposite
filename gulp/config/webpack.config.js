const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const config = require("./path")

const { js: jsConfig } = config

const webpackConfig = {
  entry: {
    main: jsConfig.entryPoint
  },
  output: {
    path: path.resolve(__dirname, jsConfig.dist),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|less|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
    })]
  },
  mode: process.env.MODE || "development",
  externals: {
    jquery: 'jQuery'
  },
}

module.exports = webpackConfig;
