const config = require('./config');
const { watch, series } = require('gulp');

const sass = require('./tasks/sass').sass(config.files.sass, config.localServerProjectPath);
sass.displayName = 'sass';  

const js = require('./tasks/js').js(config.files.js, config.files.jsOrder, config.localServerProjectPath);
js.displayName = 'js';

const html = require('./tasks/html').html(config.files.html, config.localServerProjectPath);
html.displayName = 'html';

const vendor = require('./tasks/vendor').vendor(config.files.vendor, config.localServerProjectPath);
vendor.displayName = 'vendor';

const templates = require('./tasks/templates').templates(config.files.templates, config.files.partials, config.localServerProjectPath);
templates.displayName = 'templates';

const watchFiles = () => {
     watch(config.files.sass, series(sass));
     watch(config.files.js, series(js));
     watch(config.files.html, series(html));
     watch(config.files.vendor, series(vendor));
     watch(config.files.templates, series(templates));
     watch(config.files.partials, series(templates));
 }; 

exports.watch = watchFiles

exports.sass = sass;
exports.js = js;
exports.html = html;
exports.vendor = vendor;
exports.templates = templates;
exports.default = series(sass, js, html, vendor, templates);