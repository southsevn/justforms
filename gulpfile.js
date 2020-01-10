var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var sass = require("gulp-sass");

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

function watchFiles() {
    gulp.watch("./sass/**/*", css);
    gulp.watch("./index.html");
}

const watch = gulp.parallel(css, watchFiles);

// export tasks
exports.css = css;
exports.watch = watch;
exports.default = watch;
