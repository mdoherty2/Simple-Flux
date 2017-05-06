const gulp = require('gulp');
const shell = require('gulp-shell');
const plugins = require('gulp-load-plugins')();
const opn = require('opn');

/**
 * Runs ESLint against the source files and logs the results
 */
gulp.task('lint', () => {
    return gulp.src([
            'app/src/**/*.js',
            'gulpfile.js'
        ])
        .pipe(plugins.cached('lint'))
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format());
});

gulp.task('dev', () => {
    plugins.connect.server({
      root: '.'
    });

    opn('http://localhost:8080/demo');
});
