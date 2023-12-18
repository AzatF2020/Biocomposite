const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create()
const config = require("./gulp/config/path")

const clear = require("./gulp/tasks/clear")
const pug = require("./gulp/tasks/pug")
const scss = require("./gulp/tasks/scss")
const js = require("./gulp/tasks/js")
const img = require("./gulp/tasks/img")
const fonts = require("./gulp/tasks/fonts")
const icons = require("./gulp/tasks/icons")
const video = require("./gulp/tasks/video")
const include = require("./gulp/tasks/include")
const beautifyHtml = require("./gulp/tasks/prettyHtml")

const { 
  root, 
  pug: pugConfig, 
  scss: scssConfig,
  js: jsConfig,
  img: imgConfig,
  fonts: fontsConfig,
  icons: iconsConfig,
  video: videoConfig,
  include: includeConfig
} = config

const server = async function() {
  browserSync.init({
    server: {
      baseDir: root
    }
  })
}

const watcher = function() {
  watch(pugConfig.watch, pug).on("all", browserSync.reload)
  watch(scssConfig.watch, scss).on("all", browserSync.reload)
  watch(jsConfig.watch, js).on("all", browserSync.reload)
  watch(imgConfig.watch, img).on("all", browserSync.reload)
  watch(fontsConfig.watch, fonts).on("all", browserSync.reload)
  watch(iconsConfig.watch, icons).on("all", browserSync.reload)
  watch(videoConfig.watch, video).on("all", browserSync.reload)
  watch(includeConfig.watch, include).on("all", browserSync.reload)
}

const build = series(
  clear,
  parallel(
    pug,
    scss,
    js,
    img,
    icons,
    fonts,
    video,
    include
  ),
)

const dev = series(
  clear,
  parallel(
    pug,
    scss,
    js,
    img,
    icons,
    fonts,
    video,
    include
  ),
  parallel(watcher, server)
)

exports.pug = pug
exports.scss = scss
exports.js = js
exports.img = img
exports.fonts = fonts
exports.icons = icons
exports.video = video
exports.beautifyHtml = beautifyHtml

exports.dev = dev
exports.build = build
