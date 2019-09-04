var gulp = require("gulp"),
	// jade = require("gulp-jade"),
	sass = require("gulp-sass"),
	browserSync = require('browser-sync').create(),
	notify = require("gulp-notify");
	gulpCopy = require('gulp-copy');


// gulp.task("jade", function() {
// 	gulp.src('src/jade/*.jade')
// 	.pipe(jade({pretty : true}))
// 	.pipe(gulp.dest('dist'))
// 	.pipe(browserSync.stream());
// })

gulp.task("copy", function() {
	gulp.src('src/html/index.html')
	.pipe(gulpCopy('dist', { prefix: 2 }))
	.pipe(gulp.dest('dist/index.html'))
	.pipe(browserSync.stream());
})

gulp.task("sass", function() {
	gulp.src('src/sass/*.sass')
	.pipe(sass().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } 
    )))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
})

gulp.task("serve", ['sass', 'copy'], function() {

	browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

  	gulp.watch('src/sass/*.sass', ['sass']);
	  // gulp.watch('src/jade/*.jade', ['jade']);
	gulp.watch('src/html/index.html', ['copy']);
	  
})

gulp.task('default', ['serve']);