const gulp = require("gulp")
const prettyHtml = require("gulp-pretty-html")
const htmlmin = require("gulp-htmlmin")

const beautifyHtml = async function() {
  console.log("beatyHTML")
  return gulp.src('dist/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true
    }))
    .pipe(prettyHtml({
      indent_size: 2,
      indent_char: ' ',
      indent_inner_html: true,
      unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br', 'svg'],
      content_unformatted: [],
      wrap_line_length: 0,
      inline: [],
      extra_liners: ['header', 'main', 'footer', '/body', 'svg']
    }))
    .pipe(gulp.dest('dist'));
};

module.exports = beautifyHtml