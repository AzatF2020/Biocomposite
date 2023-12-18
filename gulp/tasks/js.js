const gulp = require("gulp");

const plumber = require("gulp-plumber");
const config = require("../config/path")
const webpack = require("webpack")
const webpackStream = require("webpack-stream")
const webpackConfig = require("../config/webpack.config")

const { js: jsConfig } = config
 
const js = async function() {
  return gulp.src(jsConfig.src)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(jsConfig.dist))
}

module.exports = js