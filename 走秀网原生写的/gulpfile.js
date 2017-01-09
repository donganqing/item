/**
 * Created by hasee on 2016/7/5.
 */
var gulp = require('gulp');
var less = require('gulp-less');//容易出错 plus
var webserver = require("gulp-webserver");

/*js*/
/*var uglify =  require("gulp-uglify");*/
//var rename =  require("gulp-rename");

/*css*/
//var concat =  require("gulp-concat");
//var autoprefixer = require("gulp-autoprefixer");
//var minifyCSS =  require("gulp-minify-css");

//var imagemin = require('gulp-imagemin');//容易出错


/*开启有一个服务器*/
gulp.task("webserver",function(){
    gulp.src("./")
        .pipe(webserver({
            livereload: true, /*修改文件自动刷新*/
            directoryListing: {  /*要不要显示目录，开发环境下可以显示*/
                enable:true,
                path: './'  /*有哪个目录下开始访问*/
            },
            port: 81, /*端口号*/
            host: 'localhost'
        }))
});

gulp.task("styles",function(){
    gulp.src("zxw/less/*.less")
        .pipe(less())
      /*  .pipe(minifyCSS())
        .pipe(concat("index.min.css"))*/
        .pipe(gulp.dest("app/css/")).pipe(gulp.dest("zxw/css/"))
});

gulp.task("copyHtml",function(){
    gulp.src("zxw/*.html")
        .pipe(gulp.dest("app/"))
});


gulp.task("copyJs",function(){
    gulp.src("zxw/js/lib/*.js")
        .pipe(gulp.dest("app/js/lib/"))
});

gulp.task("script",function(){
    gulp.src("zxw/js/*.js")
       /* .pipe(jshint())*/
        .pipe(gulp.dest("app/js/"))
});


/*创建一个图片压缩的任务*/
//gulp.task("images",function(){
//  return gulp.src("zxw/images/*")
//      .pipe(imagemin())
//      .pipe(gulp.dest("app/images/"))
//});

gulp.task("watch",function(){
    gulp.watch("zxw/less/*.less",["styles"]);
    gulp.watch("zxw/*.html",["copyHtml"]);
    gulp.watch("zxw/js/*.js",["script"])
});


gulp.task("default",["styles","watch","copyHtml","copyJs","script",
"webserver"]);