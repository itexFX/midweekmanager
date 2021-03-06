var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

// Watches and builds everything in ng
gulp.task('watch:all_js', ['app_js'], function() {
  gulp.watch('ng/**/*.js', ['app_js'])
})

gulp.task('app_js', function() {
  gulp.src(['ng/application/module.js', 'ng/**/*.js'])
  .pipe(concat('midweek_js.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('assets'))
})
