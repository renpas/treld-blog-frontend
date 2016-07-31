var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    csslint = require('gulp-csslint'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less');

var Server = require('karma').Server;

gulp.task('copy', ['clean'], function(){
  console.log("coping from src to dist");
  return gulp.src('src/**/*').pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
  console.log('removing folder dist');
  return gulp.src('dist').pipe(clean());
});

gulp.task('build-img', function(){
  gulp.src('dist/assets/images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('usemin', function(){
  gulp.src('dist/**/*.html')
    .pipe(usemin({
      'js' : [uglify],
      'css': [autoprefixer, cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('server', function(){
  browserSync.init({
    server : {
      baseDir: 'src'
    }
  });

  gulp.watch('src/assets/js/**/*.js').on('change', function(event){
    gulp.src(event.path)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylish));
  });

  gulp.watch('src/assets/css/**/*.css').on('change', function(event){
    gulp.src(event.path)
      .pipe(csslint())
      .pipe(csslint.reporter());
  });

  gulp.watch('src/assets/less/**/*.less').on('change', function(event){
    gulp.src(event.path)
      .pipe(less().on('error', function(error){
        console.log('Problema na compilação');
        console.log(error.message);
      }))
      .pipe(gulp.dest('src/assets/css'));
  });

  gulp.watch('src/**/*').on('change', browserSync.reload);

});

gulp.task('test', function(done){

  return new Server({
    configFile : __dirname + '/karma.conf.js',
    singleRun  : true
  }, done).start();
});

gulp.task('default', ['copy'], function(){
  console.info('i\'m the default bitch');
  gulp.start('build-img', 'usemin');
});
