/*
* 功能 ：加载路由功能，配置路由对应的执行函数
*
*/
(function(){
  function main(){
    console.log("response ....")
    //加载路由功能 和 配置文件
    require([__uri("/routers/index.js") , __uri("/config.js")]) ;
  }
  basket.require({
    "url" : __uri("/libs/requirejs/require.min.js"),
    "unique": "require.js",
    "skipCache": false  //缓存
  }).then(function(){
    require([__uri("/common/require/require.config.js")], main);
  });
})();


