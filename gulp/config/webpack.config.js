const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const config = require("./path")
const { isDev, isProd } = require("./constants")

const { js: jsConfig } = config

const webpackConfig = {
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      // new TerserPlugin()
    ]
  },
  entry: {
    main: jsConfig.entryPoint
  },
  plugins: [
    isProd && new StatoscopeWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, jsConfig.dist),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|less|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: isDev ? 'eval-source-map' : false,
  mode: "development",
  externals: {
    jquery: 'jQuery'
  },
}

module.exports = webpackConfig;
