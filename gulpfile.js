import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from "postcss-csso";
import rename from "gulp-rename";
import terser from "gulp-terser";
import htmlmin from "gulp-htmlmin";
import squoosh from "gulp-libsquoosh";
import gulpAvif from "gulp-avif";
import svgo from "gulp-svgmin";
import { stacksvg } from "gulp-stacksvg";
import del from "del";
import browser from 'browser-sync';


// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// JS

const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(rename(
    function(path) {
      path.basename += '.min';
      path.extname = '.js';
    }
  ))
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());
}

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(gulp.dest('build/img'));
}

// Webp

const createWebp = () => {
  return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicon/*.png', '!source/img/backgrounds/**/*.jpg'])
  .pipe(squoosh({
    webp: {
      quality: 80,
    }
  }))
  .pipe(gulp.dest('build/img'))
}

// Avif

const createAvif = () => {
  return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicon/*.png', '!source/img/backgrounds/**/*.jpg'])
  .pipe(gulpAvif())
  .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

const makeStack = () => {
  return gulp.src('source/img/icons/*.svg')
  .pipe(stacksvg({ output: `sprite` }))
  .pipe(gulp.dest('build/img/icons'));
}

// Copy

const copy = () => {
  return gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
}

// Clean

const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build


export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    makeStack,
    createWebp,
    createAvif
  )
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    makeStack,
    createWebp,
    createAvif
  ),
  gulp.series(
    server,
    watcher
  )
);
