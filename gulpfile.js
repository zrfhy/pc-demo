var gulp=require("gulp");
var concat=require("gulp-concat");
var sass=require("gulp-sass");
var cleanCss=require("gulp-clean-css");
var rename=require("gulp-rename");
var uglify=require("gulp-uglify");
var inject=require("gulp-inject");
var connect=require("gulp-connect");
var imagemin=require("gulp-imagemin");

gulp.task("default",["css","javascript","html","img","server","watch"]);
gulp.task("css",function(){
	gulp.src("resouse/scss/*.scss")		//获取
	.pipe(concat("all.scss"))			//合并
	.pipe(sass())						//编译
	.pipe(cleanCss())					//压缩
	.pipe(rename('all.min.css'))		//重命名
	.pipe(gulp.dest("dest/css")) 		//输出
	.pipe(connect.reload())	
});
gulp.task("javascript",function(){
	gulp.src("resouse/js/*.js")			//gulp.src("目标文件目录")
	.pipe(concat("all.js"))				//concat("合并后文件的名称")
	.pipe(uglify())						//uglify() 压缩混淆
	.pipe(rename("all.min.js"))			//rename("新的文件的名称")
	.pipe(gulp.dest("dest/js"))			//gulp.dest("输出目录")
	.pipe(connect.reload())
});
gulp.task("html",function(){
	gulp.src("./resouse/index.html")
	.pipe(gulp.dest("./dest"))
	.pipe(inject(gulp.src(["./dest/css/all.min.css","./dest/js/all.min.js"]),{relative:true}))
	.pipe(gulp.dest("./dest"))
	.pipe(connect.reload())
});
gulp.task("img",function(){
	gulp.src("resouse/images/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dest/images/"))
	})
gulp.task("server",function(){
	connect.server({
		port:8888,
		root:"dest",
		livereload:true
	})
})
gulp.task("watch",function(){
	gulp.watch(["resouse/index.html"],["html"]);
	gulp.watch(["resouse/css/*.scss"],["css"]);
	gulp.watch(["resouse/js/*.js"],["javascript"]);
	gulp.watch(["resouse/images/*"],["img"])
		})

