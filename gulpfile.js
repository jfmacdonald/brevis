var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps');
var $ = require('gulp-load-plugins')();


var sassPaths = [
    'components/foundation-sites/scss',
    'components/motion-ui/src'
];

gulp.task('sass', function () {
    return gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe($.sass({
            includePaths: sassPaths
            //, outputStyle: 'compressed' // if css compressed **file size**
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch(['sass/**/*.scss'], ['sass']);
});
