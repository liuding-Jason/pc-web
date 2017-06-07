/*
* 功能 ：basket配置白名单，白名单中的文件，会在第一次加载之后，缓存到用户的localStorage中，
* 下次再请求相同的资源就会走本地localStorage读取
*/
define([], function () {
  let cache = {
    // underscore
    "_": {
      "url": __uri("/libs/underscore/underscore-min.js"),
      "expores": function(){
        return window._.noConflict();
      }
    },
    //jquery
    "$": {
      "url": __uri("/libs/jquery/jquery.min.js"),
      "expores": function(){
        return window.jQuery.noConflict();
      }
    },
    "bootstrap": {
      "url": __uri("/libs/bootstrap/js/bootstrap.min.js")
    },
    "dataTable": {
      "url": __uri("/libs/datatables/jquery.dataTables.min.js")
    },
    "custom": {
      "url": __uri("/libs/other/custom.js")
    },
    "placeholders": {
      "url": __uri("/libs/other/placeholders.jquery.min.js") 
    } ,
    "es5shim" : {
      "skipCache": false,
      "polyfill" : (Object['assign'] ? true : false),
      "url" : __uri("/libs/shim/es5-shim.js")
    },
    "es6shim" : {
      "skipCache": false,
      "polyfill" : (Object['assign'] ? true : false),
      "url" : __uri("/libs/shim/es6-shim.js")
    },
  };
  var module = {
    "load" : function(name, req, onLoad, config){
      if(name == "custom"){
        return req([cache[name].url], function(block){
          onLoad(block);
        })
      }
      if(cache[name]){
        setTimeout(function(){
          basket.require({
            "url" : cache[name].url,
            "unique": name,
            "skipCache": false  //缓存
          }).then(function(){
            if(cache[name].expores){
              onLoad(cache[name].expores());  
            }else{
              onLoad();
            }
          });
        }, 0);
      }else{
        req([name], function(block){
          onLoad(block);
        })
      }
    }
  };
  return module;
});