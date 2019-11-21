let gulp = require("gulp"),
	plumber = require('gulp-plumber'),
	pug = require("gulp-pug"),
	sass = require("gulp-sass"),
	csscomb = require('gulp-csscomb');
	gcmq = require('gulp-group-css-media-queries'),
	// cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create(),
	notify = require("gulp-notify");
	gulpCopy = require('gulp-copy');

gulp.task("pug", function() {
	gulp.src('src/pug/*.pug')
	.pipe(plumber())
	.pipe(pug({pretty : true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.stream());
})

// gulp.task("copy", function() {
// 	gulp.src('src/html/index.html')
// 	.pipe(gulpCopy('dist', { prefix: 2 }))
// 	.pipe(gulp.dest('dist/index.html'))
// 	.pipe(browserSync.stream());
// })

gulp.task("sass", function() {
	gulp.src('src/sass/*.sass')
	.pipe(plumber())
	.pipe(sass().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } 
	)))
	.pipe(gcmq())
	// .pipe(cleanCSS({compatibility: 'ie9', format: 'beautify'}))
	.pipe(csscomb('./zen.json'))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
})

gulp.task("serve", ['sass', 'pug'], function() {

	browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

  	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/pug/*.pug', ['pug']);
	// gulp.watch('src/html/index.html', ['copy']);
	  
})

gulp.task('default', ['serve']);