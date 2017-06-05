/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/

/**
 * 绑定路由
 * {
 *   "name": "路由名称",
 *   "icon": "图标",
 *   "url" : "路由地址",
 *   "view": "视图模块" (只能是一个视图文件，路由触发后会自动加载)
 *   "rely": "触发路由的模块" (必须是 js 模块) 如果是数组有多个模块关联会按顺序触发,
 *   "node": [
 *      子模块，参数一样
 *   ],
 *   "loading": true/false 路由响应后是否显示 loading
 * }
 */
define("sidebar/tree", [], function(){
  let router = [{
    "name" : "首页",
    "icon" : "fa fa-desktop",
    "url"  : "/home?a=1&b=2&c=3",
    "view" : "",
    "rely" : __uri("/pages/home/home.js"),
    "loading" : true
  },{
    "name" : "A",
    "icon" : "fa fa-desktop",
    "view" : "",
    "node" : [{
      "name" : "B",
      "icon" : "fa fa-desktop",
      "url"  : "/home2?a=1&b=2&c=3",
      "view" : "",
      "rely" : __uri("/pages/home/home.js"),
      "loading" : true
    }],
    "loading" : true
  },{
    "name" : "TEST B",
    "icon" : "fa fa-desktop",
    "url"  : "/test-b",
    "view" : "",
    "rely" : __uri("/pages/test-b/test-b.js"),
    "loading" : true
  },{
    "name" : "TEST C",
    "icon" : "fa fa-desktop",
    "url"  : "/test-c",
    "view" : "",
    "rely" : __uri("/pages/test-c/test-c.js"),
    "loading" : true
  }];

  return router;
});