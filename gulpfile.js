const beautify = require('gulp-html-beautify')
const gulp = require('gulp')
const babel = require('gulp-babel');
const pug = require('gulp-pug')

gulp.task('watch', () => {
    gulp.watch('./templates/*.tag', ['compile'])
    gulp.watch('./js/*.js', ['babel'])
})

gulp.task('compile', () => {
    let opts = {
        indent_size: 4,
        indent_char: ' ',
        unformatted: true,
        extra_liners: []
    }
    gulp.src('./templates/*.tag')
        .pipe(pug())
        .pipe(beautify(opts))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('babel', () => {
    return gulp.src('./js/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ["transform-vue-jsx"]
        }))
        .pipe(gulp.dest('./babel/'))
})
