const { src, dest } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify")
const gulpPug = require("gulp-pug")
const gulpif = require("gulp-if")
const webpHtml = require("gulp-html-img-wrapper")
const config = require("../config/path")
const { isProd } = require("../config/constants")

const { pug: pugConfig } = config
 
const pug = async function() {
  return src(pugConfig.src)
    .pipe(plumber({
      errorHandler: notify.onError((error) => ({
        title: "Pug",
        message: error.message
      }))
    }))
    .pipe(gulpPug({
      pretty: true,
      data: {
        solutions: require("../../src/pug/data/solutions.json")
      }
    }))
    .pipe(gulpif(isProd, webpHtml({
      logger: true,
      extensions: ['.jpg', '.png', '.jpeg'],
    })))
    .pipe(dest(pugConfig.dist))
}

module.exports = pug