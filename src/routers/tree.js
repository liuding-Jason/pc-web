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
    "name" : "商品管理" ,
    "icon" : "fa fa-desktop" ,
    "url"  : "/home" ,
    "view" : "text!" + __uri("/pages/prodManage/prodManage.html") ,
    "rely" : __uri("/pages/prodManage/prodManage.js") ,
    "loading" : false
  },{
    "name" : "订单管理" ,
    "icon" : "fa fa-table" ,
    "url"  : "/orderManage" ,
    "view" : "text!" + __uri("/pages/orderManage/orderManage.html") ,
    "rely" : __uri("/pages/orderManage/orderManage.js") ,
    "loading" : false
  } , {
    "name" : "会员管理" ,
    "icon" : "fa fa-user" ,
    "url"  : "/memberManage" ,
    "view" : "text!" + __uri("/pages/memberManage/memberManage.html") ,
    "rely" : __uri("/pages/memberManage/memberManage.js") ,
    "loading" : false
  }];

  return router;
});