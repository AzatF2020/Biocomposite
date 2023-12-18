const gulp = require("gulp");

const config = require("../config/path")
const plumber = require("gulp-plumber");
const notify = require("gulp-notify")

const { include: includeConfig } = config

const include = async function() {
  return gulp.src(includeConfig.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "JSON",
        message: error.message
      }))
    }))
    .pipe(gulp.dest(includeConfig.dist))
}

module.exports = include