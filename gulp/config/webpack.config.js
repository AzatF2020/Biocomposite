const webpack = require("webpack")
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const config = require("./path")
const {isDev, isProd} = require("./constants")

const {js: jsConfig} = config

const webpackConfig = {
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true
      })
    ]
  },
  entry: {
    main: jsConfig.entryPoint.main,
    pageTransition: jsConfig.entryPoint.pageTransition
  },
  plugins: [
    isProd && new StatoscopeWebpackPlugin({
      compressor: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    })
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
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
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
