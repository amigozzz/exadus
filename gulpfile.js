var gulp = require('gulp'),
    changed = require('gulp-changed'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    del = require('del'),

    stylesAssetsPath = 'client/styles/**/*.styl',
    stylesPublicPath = 'public/styles';

/**
 * Styles.
 */
gulp.task('styles', function () {
  return gulp.src(stylesAssetsPath)
    .pipe(changed(stylesPublicPath))
    .pipe(stylus({
      use: [nib()],
      import: ['nib']
    }))
    .pipe(gulp.dest(stylesPublicPath))
    .pipe(livereload());
});

/**
 * Watchers.
 */
gulp.task('watch', function () {
  gulp.watch(stylesAssetsPath, ['styles']);
});

/**
 * Cleaners.
 */
gulp.task('clean', function () {
  del(stylesPublicPath + '/**');
});

/**
 * Development helpers.
 */
gulp.task('dev', function () {
  nodemon({ script: 'bin/www', ext: 'js jade' })
    .on('start', ['watch'])
    .on('change', ['watch']);
});

/**
 * Default task.
 */
gulp.task('default', ['clean', 'styles', 'dev']);