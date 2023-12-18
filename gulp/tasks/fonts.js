const gulp = require("gulp");

const config = require("../config/path")
const plumber = require("gulp-plumber");
const notify = require("gulp-notify")

const { fonts: fontsConfig } = config

const fonts = async function() {
  return gulp.src(fontsConfig.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "Fonts",
        message: error.message
      }))
    }))
    .pipe(gulp.dest(fontsConfig.dist))
}

module.exports = fonts