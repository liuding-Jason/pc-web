/*
* 功能 ：利用underscore的模版功能，加载模版
*/
define(["if!$" , "if!_"], function ($ , _) {
	var template = {
		"load" : function(name, req, onLoad, config){
			req(["text!" + name], function(html){
        		onLoad(_.template(html));
			});
		} ,
		"loadData" : function(option = {}){
			/*
			* conId -- 模版id
			* data -- 模版应用的数据
			* 模版语法：_.template($(`#${conId}`).html())({data}) 在模版中，可以使用data
			*/
			let {conId = "" , data = {}} = option ;
			if(conId === ""){
				throw "conId is needed in underscore template" ;
			}
			return _.template($(`#${conId}`).html())(data) ;
		}
	} ;
	return template;
});