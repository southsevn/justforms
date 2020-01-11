var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

function browserSync(done) {
    browserSync({
        server: "html"
    });
    done();
}

function css() {
    return gulp
        .src("./sass/**/*.sass")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("./css/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./css/"))
}

function js() {
    return gulp
        .src('./scripts/src/**/*.js')
        .pipe(concat('index.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(plumber())
        .pipe(gulp.dest('./scripts/dist'))
}

function jsLibs() {
    return gulp
        .src([
            './node_modules/payment/dist/payment.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest('./scripts/dist'))
}


function watchFiles() {
    gulp.watch("./scripts/src/**/*", js);
    gulp.watch("./sass/**/*", css);
    gulp.watch("./index.html");
}

const watch = gulp.parallel(css, js, jsLibs, watchFiles);

// export tasks
exports.css = css;
exports.watch = watch;
exports.default = watch;
