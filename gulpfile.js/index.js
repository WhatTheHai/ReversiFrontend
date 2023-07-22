const config = require('./config');
const { watch, series } = require('gulp');

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}!`)
    done();
}

const sass = require('./tasks/sass').sass(config.files.sass, config.localServerProjectPath);
sass.displayName = 'sass';  

const js = require('./tasks/js').js(config.files.js, config.files.jsOrder, config.localServerProjectPath);
js.displayName = 'js';

const html = require('./tasks/html').html(config.files.html, config.localServerProjectPath);
html.displayName = 'html';

const vendor = require('./tasks/vendor').vendor(config.files.vendor, config.localServerProjectPath);
vendor.displayName = 'vendor';

const watchFiles = () => {
     watch(config.files.sass, series(sass));
     watch(config.files.js, series(js));
     watch(config.files.html, series(html));
     watch(config.files.vendor, series(vendor));
 }; 

exports.default = hello;
exports.watch = watchFiles

exports.js = js;
exports.sass = sass;
exports.html = html;
exports.vendor = vendor;