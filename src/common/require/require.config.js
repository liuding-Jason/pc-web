/*
* 功能 ：require.js 配置文件
* map中定义的内容，可以通过text!/css!应用
*/

define([],function(){
  require.config({
    baseUrl: __uri("/"),
    paths: {
      // underscore
      // "_": __uri("/libs/underscore/underscore-min.js") + "?",
      // jquery
      // "$": __uri("/libs/jquery/jquery.min.js") + "?",
      // bootstrap
      // "bootstrap": __uri("/libs/bootstrap/js/bootstrap.min.js") + "?"
      
      //http / fetch / ajax
      "http": __uri("/methods/http/http.js") + "?",
      // urlparse 分析 URL
      "urlparse": __uri("/methods/url/urlparse.js") + "?",
      // 一些 url 相关方法
      "urllib": __uri("/methods/url/urllib.js") + "?" ,
      // url 处理方法
      "urlhand" : __uri("/methods/url/urlhand.js") + "?" ,
      // 模拟 Map 对象
      "map": __uri("/libs/shim/map.js") + "?" ,
      // router / hash 资源
      "router": __uri("/common/router/hashrouter.js") + "?" ,
      // 日期选择器
      "daterangepicker": __uri("/libs/date/datepicker.js") + "?" ,
      // month 选择器
      "datepicker": __uri("/libs/date/bootstrap-datepicker.min.js") + "?" ,
      // moment时间处理工具
      "moment": __uri("/libs/date/moment.min.js") + "?" ,
      // datatable
      "dataTable": __uri("/libs/datatables/jquery.dataTables.min.js") + "?" ,
      // base components fle
      "baseUtil": __uri("/pages/base/baseUtil.js") + "?"  ,
      // ajax 处理函数
      "ajax": __uri("/methods/http/ajax.js") + "?"
      
    },
    map: {
      "*" : {
        "text" : __uri("/libs/requirejs/text.js") + "?",
        "css"  : __uri("/libs/requirejs/css.js") + "?",
        // 加载模版视图文件
        "tpl"  : __uri("./template.js") + "?",
        // 缓存模块文件
        "if": __uri("./if.js") + "?"
      }
    },
    shim: {
      // "_": {
      //   "deps": [],
      //   "init": function(){
      //     return window._.noConflict();
      //   }
      // },
      // "$": {
      //   "deps": [],
      //   "init": function(){
      //     return window.jQuery.noConflict();
      //   }
      // },
      // "bootstrap": {
      //   "deps": ["if!$", "css!" + __uri("/libs/bootstrap/css/bootstrap.min.css")],
      // }
　　}
  });
});


