/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/01
*/

define(["if!$"], function($){
  function ifFetch(url, option){
    return new Promise(function(resolve,error){
      $.ajax({
        "url": url,
        "dataType": "text",
        "success": function(res){
          resolve({
            "json": ()=> {
              return JSON.parse(res);
            },
            "text": ()=> {
              return res;
            }
          });
        }
      })
    });
  }
  return ifFetch;
});