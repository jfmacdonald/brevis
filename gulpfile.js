var gulp = require('gulp');
var stylish = require('jshint-stylish');
var $ = require('gulp-load-plugins')();

var componentScripts = [

    // Foundation uses whatInput?
    'components/what-input/what-input.js',

    // Foundation essentials
    'components/foundation-sites/js/foundation.core.js',
    'components/foundation-sites/js/foundation.util.mediaQuery.js',
    'components/foundation-sites/js/foundation.util.*.js',

    // Foundation optional, use as needed
    // 'components/foundation-sites/js/foundation.abide.js',
    // 'components/foundation-sites/js/foundation.accordion.js',
    // 'components/foundation-sites/js/foundation.accordionMenu.js',
    // 'components/foundation-sites/js/foundation.drilldown.js',
    // 'components/foundation-sites/js/foundation.dropdown.js',
    // 'components/foundation-sites/js/foundation.dropdownMenu.js',
    // 'components/foundation-sites/js/foundation.equalizer.js',
    // 'components/foundation-sites/js/foundation.interchange.js',
    // 'components/foundation-sites/js/foundation.magellan.js',
    // 'components/foundation-sites/js/foundation.offcanvas.js',
    // 'components/foundation-sites/js/foundation.orbit.js',
    // 'components/foundation-sites/js/foundation.responsiveMenu.js',
    // 'components/foundation-sites/js/foundation.responsiveToggle.js',
    // 'components/foundation-sites/js/foundation.reveal.js',
    // 'components/foundation-sites/js/foundation.slider.js',
    // 'components/foundation-sites/js/foundation.sticky.js',
    // 'components/foundation-sites/js/foundation.tabs.js',
    // 'components/foundation-sites/js/foundation.toggler.js',
    // 'components/foundation-sites/js/foundation.tooltip.js',

];

var themeScripts = [
    // Underscores
    'js/skip-link-focus-fix.js'
];

var sassPaths = [
    'components/foundation-sites/scss',
    'components/motion-ui/src'
];

gulp.task('styles', function () {
    return gulp.src('sass/style.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: sassPaths
            //, outputStyle: 'compressed' // if css compressed **file size**
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('component-scripts', function () {
    return gulp.src(componentScripts)
        .pipe($.babel({
            presets: ['es2015'],
            compact: true
        }))
        .pipe($.sourcemaps.init())
        .pipe($.concat('components.js'))
        .pipe(gulp.dest('./js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.')) // Creates sourcemap for minified Foundation JS
        .pipe(gulp.dest('./js'))
});

gulp.task('theme-scripts', function () {
    return gulp.src(themeScripts)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.concat('theme.js'))
        .pipe(gulp.dest('./js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.')) // Creates sourcemap for minified JS
        .pipe(gulp.dest('./js'))
});

gulp.task('watch', function () {
    gulp.watch(['sass/**/*.scss'], ['styles']);
    gulp.watch(themeScripts, ['theme-scripts']);
});

gulp.task('default', ['styles', 'component-scripts', 'theme-scripts']);
