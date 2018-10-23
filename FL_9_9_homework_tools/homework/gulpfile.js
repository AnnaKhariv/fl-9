const gulp = require('gulp'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rm = require('gulp-rm'),
    uglify = require('gulp-uglify-es').default,
    jslint = require('gulp-jslint')
;


const path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/sass/*.scss'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.scss',
    },
    clean: 'dist/**/*.min.*'
};

gulp.task('connect', function () {
    connect.server({
        port: 8080,
        root: 'dist',
        livereload: true
    });
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rename('index.html'))
        .pipe(gulp.dest(path.dist.html))
        .pipe(connect.reload());
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css'))
        .pipe(sass({
            noCache: true,
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(connect.reload());
});

gulp.task('js:build', function () {
    gulp.src(['node_modules/moment/moment.js', 'dist/js/clock.js', 'dist/js/canvasState.js', 'dist/js/app.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .pipe(connect.reload());
});

gulp.task('check', function () {
    return gulp.src('src/js/*.js')
        .pipe(jslint())
        .pipe(jslint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.style], ['style:build']);
    gulp.watch([path.watch.js], ['js:build']);
});

gulp.task('clean', function () {
    gulp.src(path.clean, {read: false})
        .pipe(rm());
});

gulp.task('build', function () {
    runSequence('clean', 'html:build', 'style:build', 'js:build');
});

gulp.task('build-prod', function () {
    runSequence('connect', 'build', 'watch');
});

gulp.task('default', function () {
    runSequence('build-prod');
});

