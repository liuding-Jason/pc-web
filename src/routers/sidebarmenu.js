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
define(["sidebar/tree","if!$"], function(tree, $){
  function sidebarmenu(){
    
    function children(list){
      let ul = `<ul class="nav child_menu">`;
      list.forEach(item => {
        let { name, url } = item;
        let href = "";
        if(url){
          href = `href="#${url}"`;
        }
        if(name){
          ul += `<li><a ${href}>${name}</a></li>`;
        }
      });
      ul += `</ul>`;
      return ul;
    }
    let html = `<h3>General</h3>`;
    function app(list){
      html += `<ul class="nav side-menu">`;
      list.forEach(item => {
        let { name, icon, url, node = [] } = item;
        if(!name){
          //没有名称，不做任何处理
          return false;
        }
        let href = "";
        if(url){
          href = `href="#${url}"`;
        }
        html += `<li class="menu-li"><a ${href}><i class="${icon}"></i>${name}`;
        //如果有子菜单
        if(node.length > 0){
          html += `<span class="fa fa-chevron-down"></span>`;
        }
        html += `</a>`;
        if(node.length > 0){
          html += children(node);
        }
        html += `</li>`;
      });
      html += `</ul>`;
    }
    app(tree);
    $(".menu_section","#sidebar-menu").html(html);
  }
  sidebarmenu();
  setTimeout(function(){
    require(["if!bootstrap","if!placeholders", "if!custom"]);
  }, 0);
});