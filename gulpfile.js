const gulp = require('gulp')
/**
 * scss、css
 */
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
/**
 * html
 */
const ejs = require("gulp-ejs")
const prettier = require('gulp-prettier')
/**
 * server
 */
const browserSync = require('browser-sync').create()

const clean = require('gulp-clean')
const rename = require('gulp-rename')
const filter = require('gulp-filter')

/**
 * svg
 */
const svgSprite = require('gulp-svg-sprite')

const SRC = './src'
const DIST = './dist'
const SRC_SCSS = `${SRC}/scss/*.scss`
const SRC_SVG = `${SRC}/assets/*.svg`
const SRC_JS = `${SRC}/js/*.js`
const SRC_IMG = `${SRC}/img`
const SRC_VIEWS = `${SRC}/views/**/*.ejs`

gulp.task('clean', () => {
    return gulp.src(DIST, {read: false, allowEmpty: true}).pipe(clean())
})

/**
 * svg 處理
 */
gulp.task('svg-sprite', () => {
    return gulp.src(SRC_SVG)
        .pipe(svgSprite())
        .pipe(gulp.dest(`${DIST}/svg`))
})

/**
 * css 處理
 */
gulp.task('scss', () => {
    return gulp.src(SRC_SCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${DIST}/css`))       
        .pipe(browserSync.stream())
})

gulp.task('css-autoprefixer', () => {
    return gulp.src(`${DIST}/css/*.css`)
        .pipe(
            autoprefixer({
                cascade: false
            })
        )    
        .pipe(gulp.dest(`${DIST}/css`))       
})

gulp.task('css', () => {
    return gulp.src(`${DIST}/css/*.css`)
        .pipe(
            autoprefixer({
                cascade: false
            })
        )    
        .pipe(
            cleanCSS()
        )
        .pipe(gulp.dest(`${DIST}/css`))    
})

gulp.task('css-build', gulp.series('scss', 'css'))

/**
 * js 處裡
 */

gulp.task('js', () => {
    return gulp.src(SRC_JS)
        .pipe(
            gulp.dest(`${DIST}/js`)
        )
})

/**
 * img
 */

gulp.task('img', () => {
    return gulp.src(SRC_IMG)
        .pipe(
            gulp.dest(`${DIST}/img`)
        )
})


gulp.task('public', gulp.series('js', 'img'))

/**
 * 
 * HTML 處理 
 */

gulp.task('ejs', () => {
    return gulp.src(SRC_VIEWS)
        .pipe(
            ejs()
        )
        .pipe(
            filter(['**', `!${SRC}/views/layout/*.ejs`],{restore: true})
        )
        .pipe(
            rename({ extname: '.html' })
        )
        .pipe(
            gulp.dest(DIST)
        )
})

gulp.task('html-prettier', () => {
    return gulp.src(`${DIST}/**/*.html`)
        .pipe(prettier({useTabs: true, printWidth: 80}))
        .pipe(gulp.dest(DIST))
})

gulp.task('ejs-build', gulp.series('ejs', 'html-prettier'))

/**
 * 
 * reload
 */


gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: DIST
        }
    })

    

    gulp.watch(SRC_VIEWS, gulp.task('ejs'))
    gulp.watch(SRC_SCSS, gulp.task('scss'))
    gulp.watch(SRC_JS, gulp.task('js'))

    gulp.watch(`${DIST}/**/*`).on('change', browserSync.reload)
    
})

/**
 * export task
 */
gulp.task(
    'server',
    gulp.series(
        'clean',
        gulp.parallel('scss', 'ejs', 'public'),
        'css-autoprefixer',
        'browserSync'
    )
)
gulp.task(
    'build',
    gulp.series(
        'clean',
        gulp.parallel('css-build', 'ejs-build', 'public')
    )
)


