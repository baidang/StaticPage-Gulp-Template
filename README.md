# StaticPage-Gulp-Template

> 该工程仅供自己项目进行静态页面使用，不一定具有普遍性，需要使用请根据自行需要修改，嘻嘻~~ ：）

操作步骤：
===

### 步骤0 建立基础框架页面

1. 准备好自己的页面模板，或者参考工程中的页面模板，根据业务需求自己选择，我用的是Bootstrap的基本模板

### 步骤1 建立NODE工程：

  ** 方法1： **
  
1. COPY工程中的package.json文件
2. 运行命令：
	 
	 npm install --save-dev
	
    
  ** 方法2：  **
  
1. 初始化NODE工程：npm init，生成 package.json 相关记录文件； 
2. 安装GULP相关控件：
    
       npm install --save-dev gulp gulp-load-plugins gulp-autoprefixer gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-cache gulp-inject gulp-clean bower-main main-bower-files  browser-sync merge2 del

### 步骤2 安装 BOWER 相关控件：  
  ** 方法1： **
  
1. COPY工程中的bower.json文件，根据业务不同，建议用方法2做自行安装；
2. 运行命令：
	 
	 bower install --save
	
    
  ** 方法2：  **
  
1. 初始化BOWER工程：

	bower init
	
2. 安装相关插件包：

	bower install --save jquery bootstrap fontawesome

### 步骤3 准备相关文件夹和页面骨架：

1. 创建文件夹app（存放原始文件）和dist（存放build后文件）；

### 步骤4 使用自定义Gulp命令

1. COPY 我编辑好的gulpfile.js（仅供参考），并写入相关命令逻辑：
 
     * gulp 或者 gulp serve ：本地调试
     * gulp build : 生成dist文件

### 步骤5 写你想要的各种代码

1. 至少个人觉得用起来超级方便，我直接用sublime导入app文件夹里的东西进行编辑就OK了！妈妈再也不用担心我花些无聊的时间准备写页面了，关注业务代码就好了！OH， YEAH！！！

> 其它的慢慢要求和体会吧，踩过不少坑，国内相关的高级教程非常少，工程中最需要注意的就是个文件夹的设置，因为做流Inject的时候，都是依赖于src中的文件路径，这里提示几个关键字自行研究：
	base、ignorePath、cwd、gulp-rename 

## 相关链接：

1. 中文官网入门专用，了解就行：[点击访问](www.gulpjs.com.cn)
2. 各种插件研究必备，花了我大量的时间: [点击访问](http://gulpjs.com/plugins/)
3. Gulp开发教程（翻译) ，觉得还不错的: [点击访问](http://www.w3ctech.com/topic/134)
4. StackOverFlow基本能够解决你大部分问题： [点击访问](stackoverflow.com)
