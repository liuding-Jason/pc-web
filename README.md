# PC Web

## 环境安装

执行预留的 local.make.sh 文件

    /bin/bash local.make.sh

## 本地开发调试

    npm run dev

## 发布测试版本

    npm run qa


## 目录结构

    src
        app    : 页面入口文件
        assets : 静态资源文件
        libs   : 第三方资源文件
        common : 公共代码
        components : 公共组件
        methods    : 公共方法
        routers : 路由资源管理
            sidebarmenu.js  路由配置管理
        views  : 页面资源
        pages      : 页面模块（单个页面单个模块）
            html   : 视图 html 文件
            css    : 视图 css 样式文件
            js     : 逻辑文件


## if 【缓存】

使用 if 协议去获取 jquery 文件资源

    define(["if!$"],function($){
        console.log($);
    });

通过 if 协议去关联资源，如果在缓存的白名单中获取后会缓存到浏览器 localStorage 机制中，刷新页面后在获取会优先读取浏览器 localStorage 中的缓冲数据，达到无请求的效果
如果该资源模块不在白名单中会向服务器发送请求获取该资源的数据
（note : 通过basket进行localStorage读取时，默认最大时长为5s，如果在网络条件差的情况下，可能会有bug）

* 白名单

- $ : jquery
- _ : underscore
- bootstrap : bootstrap
- dataTable : dataTable

后续需要更多可自行添加


## tpl 【模版】

使用 tpl 协议去加载一个模版资源
内部使用 underscore template 模版引擎处理

    define(["tpl!" + __uri("path.html")], function(template){
      
    })

## css 样式

使用 css 协议去处理改模块资源

    define(["css!" + __uri("path.css")], function(){
      
    })


## 单页面响应模块

内置变量

    router      : 当前 url 对象
    hideLoading : 隐藏 loading 方法
    showLoading : 显示 loading 方法,
    $body       : $("#single-page") 显示内容区域对象


## http 模块

是一个 Ajax 模块，使用方法与 fetch 类似

    http("url").then( res => res.json() ).then(res => {
        console.log(res);
    })

## urlparse 模块

是一个用做解析 url 的函数, 返回 { pathname, href, search, query } 几个对象

    require(["urlparse"], function(Urlparse){
        var urlparse = Urlparse([url]); // 如果不传参数默认当前 url 做为参数
    })

 
## urllib 模块

是一个用来处理 url 的函数，提供 { reload, replace, update, splicedURL, configure } 几个方法


#### reload 刷新页面

    require(["urllib"], function(Urllib){
        var urllib = new Urllib();
        urllib.reload();
    })

#### replace 替换当前路由

    require(["urllib"], function(Urllib){
        var urllib = new Urllib();
        urllib.replace("/newpath");
        // 执行结果如下
        http://127.0.0.1:8080/home.html#/home     执行前的地址栏地址
        http://127.0.0.1:8080/home.html#/newpath  执行后的地址栏地址
    })

#### update 更新当前路由

    require(["urllib"], function(Urllib){
        var urllib = new Urllib();
        urllib.update({
            "a": 1,
            "b": 2
        });
        // 执行结果如下
        执行前的地址栏地址
        http://127.0.0.1:8080/home.html#/home     
        执行后的地址栏地址
        http://127.0.0.1:8080/home.html#/home?a=1&b=2
    })

如需更新资源路径，可以传入第二个参数

    require(["urllib"], function(Urllib){
        var urllib = new Urllib();
        urllib.update({
            "a": 1,
            "b": 2
        },"newpath");
        // 执行结果如下
        执行前的地址栏地址
        http://127.0.0.1:8080/home.html#/home     
        执行后的地址栏地址
        http://127.0.0.1:8080/home.html#/newpath?a=1&b=2
    })


#### splicedURL 拼接 url 

    require(["urllib"], function(Urllib){
        var urllib = new Urllib();
        urllib.splicedURL({
            "a": 1,
            "b": 5
        });
        // 执行结果如下
        执行前的地址栏地址
        http://127.0.0.1:8080/home.html#/home?b=2&c=3&d=4   
        执行后的地址栏地址
        http://127.0.0.1:8080/home.html#/home?a=1&b=5&c=3&d=4   
    })

与 update 方法一样，splicedURL 也有第二个参数，第二个参数也是修改资源路径地址 

#### configure 自定义 url

    require(["urllib"], function(Urllib){
        var urllib = new Urllib();
        urllib.configure("href");
    })

该方法比较无趣, 内部实现方式是修改 window.location.href 的值


# MIT License
***[MIT](./LINCENSE)*** rights reserved !