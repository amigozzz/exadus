var gulp = require('gulp'),
    changed = require('gulp-changed'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    del = require('del'),

    stylesAssetsPath = 'client/styles/**/*.styl',
    stylesPublicPath = 'public/styles',
    scriptsAssetsPath = 'client/scripts/**/*.js',
    scriptsPublicPath = 'public/scripts';

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
 * Scripts.
 */
gulp.task('scripts', function () {
  return gulp.src(scriptsAssetsPath)
    .pipe(changed(scriptsPublicPath))
    .pipe(gulp.dest(scriptsPublicPath))
    .pipe(livereload());
});

/**
 * Watchers.
 */
gulp.task('watch', function () {
  gulp.watch(stylesAssetsPath, ['styles']);
  gulp.watch(scriptsAssetsPath, ['scripts']);
}); 

/**
 * Cleaners.
 */
gulp.task('clean', function () {
  del([
    stylesPublicPath + '/**',
    scriptsPublicPath + '/**'
  ]);
});

/**
 * Development helpers.
 */
gulp.task('dev', function () {
  nodemon({
    script: 'bin/www',
    ext: 'js jade',
    ignore: ['client/**', 'public/**']
  })
    .on('start', ['watch'])
    .on('change', ['watch']);
});

/**
 * Default task.
 */
gulp.task('default', ['clean', 'styles', 'scripts', 'dev']);