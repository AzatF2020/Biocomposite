const gulp = require("gulp");

const config = require("../config/path")
const plumber = require("gulp-plumber");
const notify = require("gulp-notify")
const imagemin = require("gulp-imagemin")
const newer = require("gulp-newer")
const webp = require("gulp-webp")
const gulpif = require("gulp-if")
const { isProd, enableImageMinification } = require("../config/constants")

const { img: imgConfig } = config

const img = async function() {
  return gulp.src(imgConfig.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "Images",
        message: error.message
      }))
    }))
    .pipe(newer(imgConfig.dist))
    .pipe(gulp.dest(imgConfig.dist))
    .pipe(gulp.src(imgConfig.src))
    .pipe(newer(imgConfig.dist))
    .pipe(gulpif(isProd && enableImageMinification, imagemin(imgConfig.imagemin)))
    .pipe(gulpif(isProd, webp()))
    .pipe(gulp.dest(imgConfig.dist))
}

module.exports = img