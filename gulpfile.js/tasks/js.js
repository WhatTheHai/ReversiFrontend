const { src, dest } = require('gulp')
const order = require('gulp-order')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const js = function (jsFiles, jsOrder, backendPath) {
  return function () {
    return src(jsFiles)
      .pipe(order(jsOrder, { base: './' }))
      .pipe(concat('app.js'))
      .pipe(
        babel({
          presets: ['@babel/preset-env']
        })
      )
      .pipe(dest('./dist/js'))
      //.pipe(uglify({ compress: true }))
      .pipe(dest(backendPath + '/js'))
  }
}
exports.js = js
