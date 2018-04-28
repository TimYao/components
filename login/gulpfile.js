/*
 * @Author: TimLie
 * @Date: 2018-04-26 11:28:15
 * @Last Modified by: TimLie
 * @Last Modified time: 2018-04-27 15:05:02
 *
 * gulpfile.js
 * @description 实现gulp+webpack构建配置
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const through2 = require('through2');
const del = require('del');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');


/*
  other
*/
let ci = false;

/*
  路径定义
*/
const filePath = {
  baseUrl: './src/',
  distUrl: './dist/',
  js: './src/js',
  css: './src/css'
};

/*
  功能函数定义
*/
let onError = (err, _context) => {
  if (ci) {
      // stop in CI
      process.exit(1);
  } else {
      // keep going in non-CI
      gutil.log(err);
      gutil.beep();
      _context.emit('end');
  }
};

/*
  定义监测es错误检查
*/
gulp.task('lint', () => {
  let task;
  task = gulp.src(filePath.js + '/scripts/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .on("error", (err) => {
      onError(err, task);
    });
  return task;
})

/*
  任务定义 es6 css
*/
gulp.task('es6', () => {
  return gulp.src([filePath.js + '/scripts/**/*.js', filePath.js + '/utils/**/*.js'], { base: filePath.baseUrl })
    .pipe(through2.obj((chunk, enc, callback) => {
      console.log(chunk.relative);
      callback(null, chunk);
    }))
    .pipe(babel())
    .pipe(gulp.dest(filePath.distUrl));
})

/*
  clean
*/
gulp.task('clean', () => {
  return del(filePath.distUrl);
})

/*
  定义启动任务
*/
gulp.task('full', function(done) {
  runSequence('clean', 'lint', 'es6', done);
});
gulp.task('dev', ['full'], () => {
  console.log('[工作中..] 👷 👷');
  gulp.watch([filePath.js + '/scripts/**/*.js', filePath.js + '/utils/**/*.js'], ['full']);
})