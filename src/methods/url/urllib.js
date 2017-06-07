/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/

define(["urlparse"], function(urlparse){
  function urllib(location){
    //刷新 重新加载
    this.reload = function(){
      window.location.reload(true);
    };
    // 替换路由
    this.replace = function(href){
      let { pathname } = window.location;
      this.configure(`${pathname}#${href}`);
    },
    /**
     * 更新
     * @param  {[type]} query    查询参数对象
     * @param  {[type]} pathname 资源路径
     */
    this.update = function(query, pathname){
      this.replace(this.splicedURL(query, pathname));
    },
    /**
    *
    */
    this.getParams = function(key){
      let {query = {}} = location ;
      if(query.hasOwnProperty(key)){
        return query[key] ;
      }
      return "" ;
    }

    /**
     * 拼接 url 
     * @param  {Object} query    参数参数对象 覆盖原有的参数
     * @param  {[type]} pathname 资源路径    覆盖原有的资源路径
     */
    this.splicedURL = function(query = {}, pathname){
      let param = Object.assign({}, this.query , query);
      let search = [];
      Object.keys(param).forEach(function(key){
        search.push(`${key}=${param[key]}`);
      });
      pathname || (pathname = this.pathname);
      if(!(/^\//.test(pathname))){
        pathname = "/" + pathname;
      }
      return `${pathname}?${search.join("&")}`;
    }
    // 自定义完整配置 url
    this.configure = function(href){
      window.location.href = href;
    }
  }
  return function(location){
    if(!location){
      location = urlparse();
    }
    return new urllib(location);
  };
})