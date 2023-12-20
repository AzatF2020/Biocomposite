const pathSrc = "./src";
const pathDist = "./dist";

module.exports = {
  root: pathDist,

  pug: {
    src: pathSrc + "/pug/pages/*.pug",
    watch: pathSrc + "/pug/**/*.pug",
    dist: pathDist
  },

  css: {
    src: pathSrc + "/css/style.css",
    watch: pathSrc + "/css/**/*.css",
    dist: pathDist + "/css"
  },
  
  scss: {
    src: pathSrc + "/scss/*.{scss,sass}",
    watch: pathSrc + "/scss/**/**/*.{scss,sass}",
    dist: pathDist + "/css"
  },

  js: {
    entryPoint: pathSrc + "/js/main.js",
    src: pathSrc + "/js/*.js",
    watch: pathSrc + "/js/**/*.js",
    dist: pathDist + "/js"
  },
  
  img: {
    src: pathSrc + "/assets/img/*.{png,jpg,jpeg,gif}",
    watch: pathSrc + "/assets/img/**/*.{png,jpg,jpeg,gif}",
    dist: pathDist + "/assets/img",
    imagemin: {
      verbose: true
    },
  },

  icons: {
    src: pathSrc + "/assets/icons/*.{svg,png}",
    watch: pathSrc + "/assets/icons/**/*.{svg,png}",
    dist: pathDist + "/assets/icons",
  },
  
  fonts: {
    src: pathSrc + "/assets/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    watch: pathSrc + "/assets/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    dist: pathDist + "/assets/fonts",
  },
  
  video: {
    src: pathSrc + "/assets/video/*",
    watch: pathSrc + "/assets/video/**/*",
    dist: pathDist + "/assets/video",
  },
  
  include: {
    src: pathSrc + "/assets/include/*.json",
    watch: pathSrc + "/assets/include/**/*.json",
    dist: pathDist + "/assets/include",
  },
}