
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del')
var bower = require('main-bower-files');
var rename = require('gulp-rename');
var gulpIgnore = require('gulp-ignore');
var compressor = require('gulp-compressor');
var gulpif = require('gulp-if');
var cleanhtml = require('gulp-cleanhtml');
var bundles = require('./bundles.json');
var aws = require('./aws.json');

var s3 = require("gulp-s3");


var uglify_options = {preserveComments: 'some', compress: true, mangle: true};
var compressor_html_options = {
    'remove-intertag-spaces': true,
    'simple-bool-attr': true,
    'compress-js': false,
    'compress-css': false
};



var paths = {
    scripts: ['./src/js/**/*.js'],
    images: ['./src/img/**/*'],
    html: ['./src/html/**/*.html'],
    css: ['./src/css/**/*.css'],
    bower_components: ['./bower_components/**/*']
};

var production = false;

gulp.task('set_production', function () {
    production = true;
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['dist/*'], cb);
});


gulp.task('scripts', ['clean'], function () {
    gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('h1_all.js'))
        .pipe(gulpif(production, uglify(uglify_options)))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./dist/js/'))
});


gulp.task('js', ['clean'], function () {
    var k;
    for (k in bundles) {
        if (bundles.hasOwnProperty(k)) {
            var bundle = bundles[k];
            if (bundle.js && bundle.js.length) {
                gulp.src(bundle.js)
                    .pipe(sourcemaps.init())
                    .pipe(concat(k + '.js'))
                    .pipe(gulpif(production, uglify(uglify_options)))
                    .pipe(sourcemaps.write('../maps'))
                    .pipe(gulp.dest('./dist/js/'));
            }

        }
    }

});

gulp.task('css', ['clean'], function () {
    var k;
    for (k in bundles) {
        if (bundles.hasOwnProperty(k)) {
            var bundle = bundles[k];
            if (bundle.css && bundle.css.length) {

                gulp.src(bundle.css)
                    .pipe(sourcemaps.init())
                    .pipe(concat(k + '.css'))
                    .pipe(gulpif(production, compressor()))
                    .pipe(sourcemaps.write('../maps'))
                    .pipe(gulp.dest('./dist/css/'));
            }


        }
    }

});



// Copy all static images
gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(gulpif(production, imagemin({optimizationLevel: 5})))
        .pipe(gulp.dest('./dist/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['default']);
    gulp.watch(paths.css, ['default']);
    gulp.watch(paths.images, ['default']);
    gulp.watch(paths.html, ['default']);
    gulp.watch(paths.bower_components, ['default']);
});


//
// concat *.js to `vendor.js`
// and *.css to `vendor.css`
// copy fonts to `fonts/*.*`
//

gulp.task('bower', ['clean'], function () {
    var jsFilter = gulpFilter('**/*.js');
    var cssFilter = gulpFilter('**/*.css');
    var fontsFilter = gulpFilter(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff']);

    return gulp.src(bower())
        .pipe(jsFilter)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(uglify(uglify_options))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.init())
        .pipe(compressor())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(cssFilter.restore())
        .pipe(fontsFilter)
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(fontsFilter.restore())
        .pipe(gulpIgnore('**/*'))
        .pipe(gulp.dest('./dist'));

});


gulp.task('minify', ['clean'], function () {
    gulp.src(paths.html)
        .pipe(gulpif(production, cleanhtml()))
        .pipe(gulp.dest('./dist'))
});

gulp.task('deploy', ['prod'], function () {
    return gulp.src('./dist/**')
    .pipe(s3(aws));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'bower', 'js', 'css', 'images', 'minify']);
gulp.task('prod', ['set_production', 'bower', 'js', 'css', 'images', 'minify']);