var gulp        = require('gulp'),
    shell       = require('gulp-shell'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync').create();

/* dirs */
var	assetsDir	= 'assets',
    bowerDir	= 'node_modules',
    targetSass	= '_sass',
    targetCSS	= 'css',
    targetFont	= assetsDir + '/fonts',
    targetJs	= assetsDir + '/js';

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
//gem -vgulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
  browserSync.init({
    server: {baseDir: '_site/'},
    open: false
  });
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve']);

gulp.task('copy_files', function() {
  gulp.src(bowerDir + '/reveal.js/lib/**/*')
    .pipe(gulp.dest(assetsDir + '/lib'));
  gulp.src(bowerDir + '/reveal.js/css/theme/source/**/*')
    .pipe(gulp.dest(targetSass + '/theme/source'));
  gulp.src(bowerDir + '/reveal.js/css/theme/template/**/*')
    .pipe(gulp.dest(targetSass + '/theme/template'));
  gulp.src(bowerDir + '/reveal.js/plugin/**/*')
    .pipe(gulp.dest(assetsDir + '/plugin'));
  gulp.src(bowerDir + '/reveal.js/js/reveal.js')
    .pipe(gulp.dest(targetJs));
  gulp.src(bowerDir + '/reveal.js/css/reveal.scss')
    .pipe(rename('_reveal.scss'))
    .pipe(gulp.dest(targetSass));
  gulp.src(bowerDir + '/reveal.js/lib/css/zenburn.css')
    .pipe(rename('_zenburn.scss'))
    .pipe(gulp.dest(targetSass));
  gulp.src(bowerDir + '/reveal.js/css/print/paper.css')
    .pipe(rename('/print/paper.css'))
    .pipe(gulp.dest(targetCSS));
  gulp.src(bowerDir + '/reveal.js/css/print/pdf.css')
    .pipe(rename('/print/pdf.css'))
    .pipe(gulp.dest(targetCSS));
  gulp.src(bowerDir + '/chart.js/dist/Chart.js')
    .pipe(gulp.dest(assetsDir + '/plugin/chart'));
  gulp.src(bowerDir + '/chart.js/dist/Chart.min.js')
    .pipe(gulp.dest(assetsDir + '/plugin/chart'));
});
