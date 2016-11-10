var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
//npm install gulp-minify-css gulp-minify-html gulp-concat gulp-uglify gulp-rename del --save-dev

//引入压缩JS的模块
var uglify = require('gulp-uglify');
//替文件重命名
var rename = require('gulp-rename');
//合并代码的模块
var concat = require('gulp-concat');
//压缩html
var minifyhtml = require('gulp-minify-html');
//压缩CSS
var minifycss = require('gulp-minify-css');
//压缩图片
var imagemin = require('gulp-imagemin');
//转化less
var less = require("gulp-less")
//gulp.task定义任务压缩JS
gulp.task("minify", function() {
		//gulp.src引入我们需要处理的文件
		gulp.src(['./js/base.js'])
			//pipe方法里面执行压缩
			.pipe(uglify())
			//合并所有的js到main.js
			.pipe(concat('main.js'))
			//执行重命名
			.pipe(rename({
				suffix: '.yao',
			}))
			//导出被压缩的js
			.pipe(gulp.dest('./dist/js'))
})
gulp.watch('./js/base.js',["minify"])
//压缩html
gulp.task("minifyhtml", function() {
		//gulp.src引入我们需要处理的文件
		gulp.src(['./views/*.html'])
			//pipe方法里面执行压缩
			.pipe(minifyhtml())
			.pipe(gulp.dest('./dist/html'))
	})
//压缩CSS
gulp.task("minifycss", function() {
	//gulp.src引入我们需要处理的文件
	gulp.src(['./styles/*.css'])
		//pipe方法里面执行压缩
		.pipe(minifycss())
		.pipe(gulp.dest('./dist/css'))
})

//压缩图片
gulp.task("imagemin", function() {
	//gulp.src引入我们需要处理的文件
	gulp.src(['./img/*.+(jpeg|jpg|png|gif)'])
		//pipe方法里面执行压缩
		.pipe(imagemin({
			optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
			interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
			multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(gulp.dest('./dist/img'))
})

//处理less文件
gulp.task("less", function() {
	//gulp.src引入我们需要处理的文件
	gulp.src(['./less/bootstrap.less'])
		//pipe方法里面执行压缩
		.pipe(less())
		.pipe(minifycss())
		.pipe(gulp.dest('./dist/less'))
})

// 创建一个任务（编译sass的任务）
// gulp.task()
gulp.task('compileSass',function(){
	// console.log('编译sass文件')
	
	// 怎么样编译sass
	// 用gulp.src找到要编译的sass文件
	gulp.src('./sass/*.scss')

	// 编译sass
		.pipe(sass({outputStyle:'compact'}))

	// 输出编译后的css文件
		.pipe(gulp.dest('./dist/css'))

		// sass编译完成后刷新
		.pipe(browserSync.reload({stream:true}))
});

// 监听编译（sass文件有修改就直接编译）
gulp.task('autoCompile',function(){
	gulp.watch('./sass/*.scss',['compileSass']);
})

// 浏览器同步测试
gulp.task('server',function(){
	browserSync.init({
		server:{baseDir:'./src'}
	});

	// **代表任意目录
	// *代表任意文件名
	gulp.watch('./src/**/*.html').on('change',browserSync.reload);
	gulp.watch('./src/css/*.css').on('change',browserSync.reload);

	// Sass编译完成后再刷新
	gulp.watch('./**/sass/*.scss',['compileSass']);
});
gulp('default',[''])