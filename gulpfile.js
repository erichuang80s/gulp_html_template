const gulp = require('gulp')

const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')

const browserSync = require('browser-sync').create()

const clean = require('gulp-clean')

const SRC = './src'
const DIST = './dist'
const SRC_SCSS = `${SRC}/scss/*.scss`

gulp.task('clean', () => {
    return gulp.src(DIST, {read: false}).pipe(clean())
})

gulp.task('scss', () => {
    return gulp.src(SRC_SCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${DIST}/css`))
})



gulp.task('css', () => {
    return gulp.src(`${DIST}/css/*.css`)
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(gulp.dest(`${DIST}/css`))
})

gulp.task('css-build', () => {
    return gulp.src(`${DIST}/css/*.css`)
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(gulp.dest(`${DIST}/css`))
})

gulp.task('scss-watch', gulp.series('scss'), (cd) => {
    browserSync.reload()
    cd()
})

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: DIST
        }
    })
    gulp.watch(SRC_SCSS).on('change', gulp.task('scss-watch'))    
})

gulp.task('server', gulp.series('scss', 'browserSync'))


