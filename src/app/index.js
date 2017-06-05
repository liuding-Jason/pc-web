/*
* 功能 ：加载默认页面
* 
*/
(function(){
  function main(){
    console.log("response ....")
    //加载路由功能
    require([__uri("/pages/index/index.js")])
  }
  basket.require({
    "url" : __uri("/libs/requirejs/require.min.js"),
    "unique": "require.js",
    "skipCache": false  //缓存
  }).then(function(){
    require([__uri("/common/require/require.config.js")], main);
  });
})();