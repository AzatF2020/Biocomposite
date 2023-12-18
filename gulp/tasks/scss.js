const { src, dest } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify")
const config = require("../config/path")
const autoprefixer = require("gulp-autoprefixer")
const csso = require("gulp-csso")
const rename = require("gulp-rename")
const sass = require("gulp-sass")(require("sass"))
const sassGlob = require("gulp-sass-glob")
const { isDev } = require("../config/constants")

const { scss: scssConfig } = config
 
const scss = async function() {
  return src(scssConfig.src, { sourcemaps: isDev})
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "SCSS",
        message: error.message 
      }))
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(scssConfig.dist, { sourcemaps: isDev }))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    .pipe(dest(scssConfig.dist, { sourcemaps: isDev }))
}

module.exports = scss