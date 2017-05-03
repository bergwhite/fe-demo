const gulp = require('gulp'),
      lessToCSS = require('gulp-less'),
      minifyCSS = require('gulp-clean-css'),
      minifyJS = require('gulp-uglifyjs'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect'),
      copy = require('gulp-copy');
// 编译后的文件存放目录
var siteDir = 'dest';
// 即使预览的规则
var siteReload = {
  css: 'src/css/*\.less',
  js: 'src/js/*\.js'
}
// 需要编译的文件目录
var compileDir = {
  css: {
    src: 'src/css/index.less',
    dest: 'dest/css'
  },
  js: {
    src: 'src/js/index.js',
    dest: 'dest/js'
  },
  copyApi: {
    src: 'src/api/*',
    dest: 'dest/api'
  },
  copyHTML: {
    src: 'src/index.html',
    dest: 'dest'
  }
};
// 编译CSS
gulp.task('compile-css', () => {
  return gulp.src(compileDir.css.src)
        .pipe(lessToCSS())
        .pipe(minifyCSS())
        .pipe(gulp.dest(compileDir.css.dest))
        .pipe(connect.reload())
});
// 编译JS
gulp.task('compile-js', () => {
  return gulp.src(compileDir.js.src)
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(minifyJS())
        .pipe(gulp.dest(compileDir.js.dest))
        .pipe(connect.reload())
});
// 编译拷贝文件
gulp.task('copy-api', () => {
  return gulp.src(compileDir.copyApi.src)
        .pipe(gulp.dest(compileDir.copyApi.dest))
        .pipe(connect.reload())
});
gulp.task('copy-html', () => {
  return gulp.src(compileDir.copyHTML.src)
        .pipe(gulp.dest(compileDir.copyHTML.dest))
        .pipe(connect.reload())
});
// 编译
gulp.task('build',['compile-css','compile-js','copy-api','copy-html'])
// 开发
gulp.task('dev',['build'], () => {
  connect.server({
    root: siteDir,
    livereload: true
  })
  gulp.watch(siteReload.css, () => {
    return gulp.run('compile-css')
  })
  gulp.watch(siteReload.js, () => {
    return gulp.run('compile-js')
  })
  gulp.watch(compileDir.copyApi.src, () => {
    return gulp.run('copy-api')
  })
  gulp.watch(compileDir.copyHTML.src, () => {
    return gulp.run('copy-html')
  })
});