/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/01
*/

define([__uri("./ifFetch.js")], function(ifFetch){
  function http(url, option){
    return ifFetch(url, option);
  }
  return http;
});