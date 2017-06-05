/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/

define(["map", "urlparse"],function(Map, Url){
	let Hash = [];
	let oldHref = void 0;
	let hooks = {
		//路由变化时执行
		"route" : [],
		//默认路由
		"defaultAction" : []
	};


	function hashchange(){
		//清除开头的 # 字符, 获取 hash 值
		let result = Url((window.location.hash || "").replace(/^#+/,""));
		let newHref = Object.assign({}, result,{
			"reload" : function(){
				window.location.reload(true);
			},
			"replace" : function(href){
				let { pathname } = window.location;
				window.location.href = `${pathname}#${href}`;
			},
			"update" : function(query, pathname){
				this.replace(this.splicedURL(query, pathname));
			},
			"splicedURL" : function(query = {}, pathname){
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
		});
		if(oldHref){
			//离开
			oldHref["leave"] && oldHref["leave"](oldHref["res"], result);
		}
		//每一次变化
		hooks.route.forEach(callback => callback(result));
		
		setTimeout(function(){
			let status = true;
			for(var i=0, len = Hash.length; i < len; i++){
				let item = Hash[i];
				let { href, enter } = item ;
				if(href.test(result.pathname)){
					status = false;
					enter && enter(newHref, oldHref); //进入
					oldHref = Object.assign({
						"res" : result,
					}, item);
					break;
				}
			}
			//表示路由里没有匹配的模块
			if(status){
				//默认
				hooks.defaultAction.forEach(callback => callback(result));
			}
		}, 0);
	};

	//监听 hash 变化
	window.addEventListener("hashchange", hashchange);

	class Route{
		//是否依赖在某域名下
		constructor(root = ""){
			this.root = root
		}
		add(...args){
			this.push(...args);
		}
		push(href, option = {}){
			if(!href || typeof href != "string"){
				return false;
			}
			if(href.includes("?")){
				href = Url(href).pathname;
			}
			let { enter, leave} = option;
			let route;
			// 类似 /abc/ 表达式
			if(/^\/.+\/$/.test(href)){
				route = RegExp(href.slice(1,-1));
				// 类似 /abc/i, /abc/g, /abc/gi, /abc/ig 表达式
			}else if(/^\/.+\/(i|g|ig|gi)$/.test(href)){
				let i = href.lastIndexOf("/");
				route = RegExp(href.slice(1,i), href.slice(i + 1));
			}else{
				if(/^\//.test(href)){
					route = RegExp(`^${href}$`);
				}else{
					route = RegExp(`^/${href}$`);
				}
			}
			let item = {
				"href"  : route,
				"enter" : enter,
				"leave" : leave
			};
			Hash.push(item);
			return item;
		}
		refresh(){
			hashchange();
		}
		start(){
			this.refresh();
		}
		on(key, callback){
			if(typeof callback == "function"){
				hooks[key] && hooks[key].push(callback);
			}
		}
	}
	return Route;
});