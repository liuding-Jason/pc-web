/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/01
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