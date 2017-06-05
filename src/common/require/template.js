/*
* 功能 ：利用underscore的模版功能，加载模版
*/
define(["if!_"], function (_) {
	var template = {
		"load" : function(name, req, onLoad, config){
			req(["text!" + name], function(html){
        		onLoad(_.template(html));
			});
		}
	};
	return template;
});