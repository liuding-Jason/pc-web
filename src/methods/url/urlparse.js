/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/


/**
 * urlparse
 * 拆分 url 把 url 分成 4 个模块
 * {
 *   "pathname" : 当前路径名称,
 *   "href"     : url 完整资源,
 *   "search"   : 查询参数资源
 *   "query"    : 对 search 资源解析
 * }
 */
define([],function(){
  function Url(href = window.location.hash, space = "&"){
    let url = href.split("?");

    let search = (url[1]) || "";
    let match = search.match(RegExp(`(^|${space})([a-zA-Z0-9-_]+)`, "g")) || []; //  /(^|&)([\w]+)/g
    let query = {};
    match.forEach(function(key){
      key = key.replace(RegExp(space),""); // /&/
      let reg = RegExp(`(${space}|^)${key}=([^${space}].*?)(${space}|$)`);
      let value = search.match(reg) || [];
      query[key] = value[2] ? decodeURI(value[2]) : void 0;
    });
    let pathname = url[0];
    if(!(/^\//.test(pathname))){
      pathname = "/" + pathname;
    }
    return {
      "pathname" : pathname,
      "href" : href,
      "search" : search,
      "query" : query
    };
  }
  return Url;
});