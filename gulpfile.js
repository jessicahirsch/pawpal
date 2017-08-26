const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

const webserver = require('gulp-webserver');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['public/assets/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("public/assets/css"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./public"
    });
    gulp.watch(['public/assets/sass/*.scss'], ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);
