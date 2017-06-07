
/*
* url 处理函数
*/

define(["urlparse"] , function(urlparse){
	function UrlHand(location){
		let {href , pathname , query , search} = location ;
		this.href = href ;
		this.pathname = pathname[0] === "/" ? pathname.slice(1 , pathname.length) : pathname ;
		this.query = query ;
		this.search = search ;
		/*
		* 获取location
		*/
		this.getLocation = function(){
			return  Object.assign({} , location  , {
				pathname : pathname[0] === "/" ? pathname.slice(1 , pathname.length) : pathname
			}) ;
		}
		/*
		* 获取query
		*/
		this.getQuery = function(){
			return this.query ;
		}
		/*
		* 从URL中获取对应key的参数值
		* @key -- 键名
		*/
		this.getParam = function (key){
			if(this.query.hasOwnProperty(key)){
				return this.query[key] ;
			}
			return void 0 ;
		}
		/*
		* 功能 ：更新路由值
		* @params -- 参数对象
		* @pathname -- 
		*/
		this.update = function(params = {} , pathname){
			let query = Object.assign({} , this.query , params) ;
			this.configure(this.connect(query , pathname));
		}
		/*
		* 功能 ：拼接参数
		*/
		this.connect =  function(params = {} , pathname){
			let search = "" ;
			Object.keys(params).forEach((item) => {
				search += `${item}=${params[item]}&` ;
			}) ;
			search === "" || (search = search.slice(0 , search.length - 1)) ;
			pathname || (pathname = this.pathname) ;
			return `${pathname}?${search}` ;
		}
		/*
		*  功能 ：配置url
		*/
		this.configure = function(href){
			window.location.href = href ;
		}
	}
	return function(location){
		location || (location = urlparse()) ;
		return new UrlHand(location) ;
	}
});