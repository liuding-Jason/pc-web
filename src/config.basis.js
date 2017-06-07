/**
 * 基础信息配置
 */

(function(window, factory){
	if (typeof define === 'function') {
	    define([], factory);
	} else {
	    window["configBasis"] = factory();
	}
})(window, function(){
	// 该变量由 fis 工具注入
	let NODE_ENV = "{{NODE_ENV}}";
	let config = {};
	switch(NODE_ENV){
		case "dev":
			config = {
				"NODE_ENV": NODE_ENV,
				"Version" : "v1",
				"HOST" : "//192.168.60.238:8080",   //  网页域名
				"API"  : "//dev.report.kuandd.com"  //  请求接口地址
			};
			break;
		case "mock" :
		case "qa":
			config = {
				"NODE_ENV": NODE_ENV,
				"Version" : "v1",
				"HOST" : "//qa.new.report.kuandd.com",   //  网页域名
				"API"  : "//qa.report.kuandd.com"  //  请求接口地址
			};
			break;			
		case "production":
		//默认线上配置
		default:
			config = {
				"NODE_ENV": NODE_ENV,
				"Version" : "v1",
				"HOST" : "//bi.kuandd.com",    //  网页域名
				"API"  : "//report.kuandd.com" //  请求接口地址
			};
			break;
			
	}
	return config;
});