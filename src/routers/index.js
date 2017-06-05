/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/

// fis 自动内联该文件
__inline('./tree.js');
define(["if!$","router", "urllib","urlparse", "sidebar/tree"], function($, Router, Urllib, Urlparse, tree){
  console.log("start");
  require([__uri("./sidebarmenu.js")]);

  let { HashHistory, Link } = Router;

  let hashHistory = new HashHistory();


  let t;
  let hide = () => {
    $("body").css({
      'overflow' : 'auto'
    }).removeClass("loaded");
    t && clearTimeout(t);
  };
  let show = () => {
    $("body").css({
      'overflow' : 'hidden'
    }).addClass("loaded");
    clearTimeout(t);
    t = setTimeout(hide, 1000 * 10);
  };

  const $singlepage = $("#single-page");

  //处理模块依赖，逻辑请到依赖中去处理, 这里不做处理
  function relyon(loading, location, rely){
    let _loaction = {
      "router"      : location,
      //隐藏 loading 效果
      "hideLoading" : hide,
      //显示 loading 效果
      "showLoading" : show,
      "$body": $singlepage
    };
    if(loading){
      _loaction.showLoading();
    }
    require([].concat(rely), function(...args){
      args.forEach(item => {
        if(item.prototype){
          for(let key in _loaction){
            item.prototype[key] = _loaction[key];
          }
        }
        new item();
      });
    });
  }

  function app(list){
    list.forEach( item => {
      let { url, node = [], loading, view, rely = [] } = item;
      if(url){
        let { pathname } = new Urlparse(url);
        new Link(pathname, function(location){
          //处理视图
          if(view){
            require([view], function(html){
              if($.type(html) == "string"){
                $singlepage.html(html);
              }else{
                $singlepage.html(html(location));
              }
              relyon(loading, location, rely);
            });
          }else{
            relyon(loading, location, rely);
          }
        });
      }
      //递归处理子菜单路由事件
      app(node);
    });
  }

  app(tree);
  

  //添加路由未匹配时处理逻辑
  hashHistory.defaultAction(function(loaction){
    const urllib = Urllib();
    console.log(loaction);
    urllib.replace("/home");
  });
  hashHistory.start();
});