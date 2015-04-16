'use strict';

// Basic Plugins' Defination
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
  bowerMain = require('bower-main'),
  merge2 = require('merge2'),
  mainBowerFiles = require('main-bower-files'),
	browserSync = require('browser-sync');

var reload = browserSync.reload;

// Build Control
gulp.task('dev', function(){
  var devcode = merge2(
    gulp.src('./app/assets/js/dev/*.js', {base: 'app'}),
    gulp.src('./app/assets/css/dev/*.css', {base: 'app'})
    );

  return gulp.src('./app/index.html')
      .pipe(plugins.inject(gulp.src(mainBowerFiles(), {read: false}),{name: 'bower'}))
      .pipe(plugins.inject(devcode,{ignorePath: 'app'}))
      .pipe(gulp.dest('./app'));

});

// Dist Control
gulp.task('fonts', function(){
	return gulp.src(mainBowerFiles({filter: '**/*.{eot,svg,ttf,woff,woff2}'}))
    	.pipe(gulp.dest('./app/assets/css/fonts'));
});

gulp.task('css',function(){
	return gulp.src('./app/assets/css/dev/*.css')
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('./dist/assets/css/dev'));
});

// gulp.task('jshint', function () {
//   return gulp.src('app/scripts/**/*.js')
//     .pipe(reload({stream: true, once: true}))
//     .pipe($.jshint())
//     .pipe($.jshint.reporter('jshint-stylish'))
//     .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
// });

gulp.task('img',function(){
	return gulp.src('./app/assets/img/**/*')
		.pipe(plugins.cache(plugins.imagemin({
		      progressive: true,
		      interlaced: true,
		      // don't remove IDs from SVGs, they are often used
		      // as hooks for embedding and styling
		      svgoPlugins: [{cleanupIDs: false}]
		    })))
		.pipe(gulp.dest('./dist/assets/img/'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('html', function(){
  var bowerMainJsFiles = bowerMain('js', 'min.js');
  var bowerMainCssFiles = bowerMain('css', 'min.css');

  var cssDevStream = gulp.src('./app/assets/js/dev/*.js')
                     .pipe(gulp.dest('./dist/assets/css/dev/'));
  var jsDevStream = gulp.src('./dist/assets/css/dev/*.css');

  var jsLibStream = merge2(
                    gulp.src(bowerMainJsFiles.minified),
                    gulp.src(bowerMainJsFiles.minifiedNotFound)
                        .pipe(plugins.concat('tmp.min.js'))
                        .pipe(plugins.uglify())
                    )
                  .pipe(gulp.dest('./dist/assets/js/lib/'));

  var cssLibStream = merge2(
                    gulp.src(bowerMainCssFiles.minified),
                    gulp.src(bowerMainCssFiles.minifiedNotFound)
                        .pipe(plugins.concat('tmp.min.css'))
                        .pipe(plugins.uglify())
                    )
                  .pipe(gulp.dest('./dist/assets/css/lib/'));

  return gulp.src('./app/index.html')
      .pipe(plugins.inject(jsLibStream, {name: 'bower', ignorePath: 'dist'}))
      .pipe(plugins.inject(cssLibStream, {name: 'bower', ignorePath: 'dist'}))
      .pipe(plugins.inject(cssDevStream, {ignorePath: 'dist'}))
      .pipe(plugins.inject(jsstream, {jsDevStream: 'dist'}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['css', 'fonts', 'img', 'html']);

// Serve Tasks
gulp.task('serve', ['dev'], function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: './app',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/assets/css/**/*.css',
    'app/assets/img/**/*',
    'app/assets/js/**/*.js'
  ]).on('change', reload);

  gulp.watch('bower.json', ['dev']);
});

gulp.task('clean', require('del').bind(null, ['dist']));

// gulp.task('clean', function() {
//   return gulp(['./dist/'], { read:false })
//     .pipe(plugins.clean());
// });

gulp.task('default', ['serve']);

gulp.task('build',  ['clean'], function(){
  gulp.start('dist');
});

