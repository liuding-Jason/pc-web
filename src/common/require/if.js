/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/01
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
    }
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