var gulp = require('gulp'),
    changed = require('gulp-changed'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),

    stylesAssetsPath = 'client/styles/**/*.styl';

gulp.task('styles', function () {
  return gulp.src(stylesAssetsPath)
    .pipe(changed('public/styles'))
    .pipe(stylus({
      use: [nib()],
      import: ['nib']
    }))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('watch', function () {
  gulp.watch(stylesAssetsPath, ['styles']);
})

gulp.task('dev', function () {
  nodemon({ script: 'bin/www', ext: 'js jade' })
    .on('start', ['watch'])
    .on('change', ['watch']);
});

gulp.task('default', ['styles', 'dev']);