const {src, dest} = require('gulp');
const concat = require('gulp-concat');

const vendor = function (vendorFiles, backendPath) {
    return function () {
        return src(vendorFiles)
            .pipe(concat('vendor.js'))
            .pipe(dest('dist/js'))
            .pipe(dest(backendPath + "/js"));
    }
};

exports.vendor = vendor;