/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/

define([__uri("./route.js")],function(Route){
	const route = new Route();
	//封装一个链接
	class Link{
		constructor(href,...args){
			if(!href){
				return false;
			}
			let option;
			switch(args.length){
				case 1:
					let [ obj ] = args;
					if(typeof obj == "function"){
						option = {
							"enter" : obj,
							"leave" : void 0
						}
					}else if(typeof obj == "object"){
						let { enter, leave} = obj;
						option = {
							"enter" : enter,
							"leave" : leave
						};
					}
					break;
				case 2:
					let [ Enter, Leave ] = args;
					option = {
						"enter" : Enter,
						"leave" : Leave
					};
					break;
				default:
					option = {};
					break;
			}
			//添加路由
			route.push(href, option);
		}
	}
	return function(path, callback){
		return new Link(path, callback);
	};
});