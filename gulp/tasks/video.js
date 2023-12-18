const gulp = require("gulp");

const config = require("../config/path")
const plumber = require("gulp-plumber");
const notify = require("gulp-notify")

const { video: videoConfig } = config

const video = async function() {
  return gulp.src(videoConfig.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "Video",
        message: error.message
      }))
    }))
    .pipe(gulp.dest(videoConfig.dist))
}

module.exports = video