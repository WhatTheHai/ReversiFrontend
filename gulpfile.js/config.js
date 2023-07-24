module.exports = {
    localServerProjectPath : 'C:/Users/Hai/source/repos/ReversiMvcApp/ReversiMvcApp/wwwroot',
    files: {
        js: [
            'source/js/**/*.js',
            'source/js/*.js'
        ],
        jsOrder: [
            'source/js/game.js',
            'source/js/game.templates.js',
            'source/js/**/*.js',
        ],
        sass: [
            './source/css/*.css',
            './source/css/*.scss',
        ],
        html: [
            'source/index.html'
        ],
        vendor: [
            './vendor/**/*.js',
        ],
        templates: [
            './templates/**/[^_]*.hbs',
        ],
        partials: [
            './templates/**/_*.hbs',
        ]
    },
};