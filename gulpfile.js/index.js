const config = require('./config');
const { watch, series } = require('gulp');
const Sass = require('gulp-sass')(require('sass'));

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}!`)
    done();
}

sass = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass';  

const js = require('./tasks/js').js(config.localServerProjectPath);
js.displayName = 'js';


const watchFiles = () => {
     watch(config.files.sass, series(sass));
     watch(config.files.js, series(js));
 }; 

exports.default = hello;

exports.watch = watchFiles

exports.js = js;
exports.sass = sass;