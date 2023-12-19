const { src, dest } = require("gulp");

const fs = require('fs');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify")
const gulpPug = require("gulp-pug")
const gulpif = require("gulp-if")
const webpHtml = require("gulp-html-img-wrapper")
const config = require("../config/path")
const { isProd, jsonPugFolder } = require("../config/constants")

const { pug: pugConfig } = config

function getJsonFileNames() {
  return fs.readdirSync(jsonPugFolder, (err, files) => {
    try {
      return files.map((file) => file)
    } catch (err) {
      console.error(err)
    }
  });
}

function getJsonObject() {
  const jsonPugObj = {}
  const fileNames = getJsonFileNames()
  
  fileNames?.forEach((file) => {
    const modifiedFile = file.split(".")[0]
    jsonPugObj[modifiedFile] = require(`../../src/pug/data/${file}`);
  })
  
  return jsonPugObj
}

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
      data: getJsonObject()
    }))
    .pipe(gulpif(isProd, webpHtml({
      logger: true,
      extensions: [".jpg", ".jpeg", ".png", ".jpeg"],
    })))
    .pipe(dest(pugConfig.dist))
}

module.exports = pug