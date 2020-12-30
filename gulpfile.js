"use strict";
var Fiber = require("fibers");
var gulp = require("gulp");
var sass = require("gulp-sass");
var babel = require("gulp-babel");
sass.compiler = require("node-sass");

var sassPath = "src/sass/**/*.scss";
var jsPath = "src/js/*.js";

gulp.task("sass", function () {
  return gulp
    .src(sassPath)
    .pipe(sass({ fiber: Fiber }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("babel", function () {
  return gulp
    .src(jsPath)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function () {
  gulp.watch(sassPath, gulp.series("sass"));
  gulp.watch(jsPath, gulp.series("babel"));
});
