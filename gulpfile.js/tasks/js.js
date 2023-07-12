const {src, dest} = require('gulp');
const order = require('gulp-order');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const fn = function (backendPath) {
  return function () {
    return src('js/*.js')
    .pipe(dest('dist'))
    .pipe(dest(backendPath));
  };
};

const orderFiles = function(filesJs, filesJsOrder, backendPath) {
    return src(filesJs)
            .pipe(order(filesJsOrder, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest('./dist/js'))
            .pipe(dest(backendPath + 'js'));
}

exports.js = orderFiles;
exports.js = fn;

