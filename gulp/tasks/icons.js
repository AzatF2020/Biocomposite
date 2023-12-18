const gulp = require("gulp");

const config = require("../config/path")
const plumber = require("gulp-plumber");
const notify = require("gulp-notify")

const { icons: iconsConfig } = config

const icons = async function() {
  return gulp.src(iconsConfig.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "Icons",
        message: error.message
      }))
    }))
    .pipe(gulp.dest(iconsConfig.dist))
}

module.exports = icons