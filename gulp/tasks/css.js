const { src, dest } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify")
const config = require("../config/path")
const concat = require("gulp-concat");
const cssImport = require("gulp-cssimport")
const autoprefixer = require("gulp-autoprefixer")
const csso = require("gulp-csso")
const rename = require("gulp-rename")
const webpCss = require("gulp-webp-css")
const { isDev } = require("../config/constants")

const { css: cssConfig } = config
 
const css = async function() {
  return src(cssConfig.src, { sourcemaps: isDev })
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "CSS",
        message: error.message
      }))
    }))
    .pipe(concat("main.css"))
    .pipe(cssImport())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(dest(cssConfig.dist, { sourcemaps: isDev }))
    .pipe(rename({suffix: "min"}))
    .pipe(csso())
    .pipe(dest(cssConfig.dist, { sourcemaps: isDev }))
}

module.exports = css