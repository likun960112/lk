//遵循commonJS规范 托管项目
const gulp = require('gulp');

//编写任务
//整理index.html
gulp.task("copy-html", function(){
	return gulp.src("index.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

gulp.task("copy-htmls",function(){
	return gulp.src(["*.html","!index.html"])
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload());
})

//拷贝图片
gulp.task("images", function(){
	return gulp.src("images/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

//将超过两个文件爱你拷贝到一个目录下
gulp.task("data", function(){
	return gulp.src(["*.json", "*.xml", "!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})


//引入sass插件
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCss = require("gulp-minify-css");

gulp.task("scss", function(){
	return gulp.src("css/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCss())
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".css";
	}))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

//生成JS
const uglify = require("gulp-uglify");
gulp.task("js", function(){
	return gulp.src("js/*.js")
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".js";
	}))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

//一次性执行多个任务
gulp.task("build", ["copy-html", "copy-htmls", "images", "data", "scss", "js"], function(){
	console.log("编译成功");
})

//gulp监听
gulp.task("watch", function(){
	gulp.watch("index.html", ['copy-html']);
	gulp.watch(["*.html","!index.html"], ["copy-htmls"]);
	gulp.watch("images/**/*", ["images"]);
	gulp.watch(["*.json", "*.xml", "!package.json"], ["data"]);
	gulp.watch("css/*.scss", ["scss"]);
	gulp.watch("js/*.js", ["js"]);
})

const connect = require("gulp-connect");

gulp.task("server", function(){
	connect.server({
		root: "dist", //指定服务器的根目录
		port: 6464, //设置一个端口号
		livereload: true
	})
})

//设置默认执行任务
gulp.task("default", ["watch", "server"]);