var gulp = require('gulp'),
//concat = require('gulp-concat'),
imagemin = require('gulp-imagemin'),
stylus = require('gulp-stylus'),
nib = require('nib'),
uglify = require('gulp-uglify');
htmlMin = require('gulp-htmlmin');

gulp.task('html', function(){
  gulp.src('src/**/*.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

//gulp.task('componentsHtml', function(){
//  gulp.src('src/components/**/*.html')
  //  .pipe(htmlMin({collapseWhitespace: true}))
  //  .pipe(gulp.dest('dist/components'));
//});

gulp.task('js', function(){
  gulp.src(['src/js/**/*.js', '!src/js/vendor/*.js'])
    //.pipe(concat('bundle.js'))
    .pipe(uglify(/*{mangle: false}*/))
    .pipe(gulp.dest('dist/js'));
});

//gulp.task('componentsJs', function(){
  //gulp.src(['src/components/**/*.js'])
    //.pipe(concat('bundle.js')) NO QUITAR ESTE A MENOS QUE SE USE
    //.pipe(uglify({mangle: false}))
    //.pipe(gulp.dest('dist/components'));
//});

gulp.task('img', function(){
  gulp.src(['src/img/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('css', function(){
  gulp.src(['src/css/*.styl', '!src/css/vendor/*.css', '!src/css/fonts/*'])
    .pipe(stylus({
      use: [nib()],
      compress: true
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('mirarCSS', function(){
  gulp.src(['src/css/*.styl', '!src/css/vendor*.css'])
    .pipe(stylus({
      use: [nib()],
      compress: true
    }))
    .pipe(gulp.dest('src/css'));
});


gulp.task('copiar', function(){
	gulp.src(['src/**/*', '!src/**/*.html', '!src/js/**/*', '!src/css/**/*', '!src/img/**/*', '!src/components/**/*'])
		.pipe(gulp.dest('dist'));

	gulp.src(['src/js/vendor/**/*'])
		.pipe(gulp.dest('dist/js/vendor'));

  gulp.src(['src/css/vendor/**/*'])
    .pipe(gulp.dest('dist/css/vendor'));

  gulp.src(['src/css/fonts/**/*'])
    .pipe(gulp.dest('dist/css/fonts'));
});


gulp.task('iniciar', function(){
  gulp.watch(['src/css/*.styl', '!src/css/vendor/*.css'], ['mirarCSS']);
});

gulp.task('build', ['copiar', 'html', 'js', 'img', 'css'/*, 'componentsHtml', 'componentsJs'*/]);

