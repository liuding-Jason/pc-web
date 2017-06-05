/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/

define([__uri("./link.js"), __uri("./route.js")],function(Link, Route){
	function HashHistory(){
		const route = new Route();

		// 监听路由未响应时该如何处理
		this.defaultAction = function(callback){
			route.on("defaultAction", callback);
		}
		/**
		 * 添加一个路由
		 * @param  href : 路由地址
		 * @return option : {
		 *            "enter":  "进入 function",
		 *            "leave":  "离开 function"
		 * 				 }
		 *
		 * push("href", function(){  //第二个参数默认为 enter
		 * 
		 * })
		 */
		this.push = function(href, option){
			return new Link(...args);
		}

		this.refresh = function(){
			return route.refresh();
		}

		this.start = function(){
			return route.start();
		}

		this.on = function(key, callback){
			return route.on(key, callback);
		}
	}
	return { Route, Link, HashHistory };
});

