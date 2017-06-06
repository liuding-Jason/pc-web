/*
* 创建胶囊按钮 
* @param1 conId    - 容器的id
* @param2 options  - 配置项数组 [{optType : 'daily' , optName : '日'}]
* @param3 defType  - 默认参数 daily
* @param4 keyParam - 点击按钮时需要更新的参数名称
*/

define([
	__uri("../../methods/url/urllib.js")
	] , function(HandleUrl){

	class Buttons {
		constructor(params = {}){
			this.hand = urllib() ;
			this.init(params);
		}

		_onClick(keyParam){
			this.$dom.on('click' , (ev) => {
				if(ev.target.nodeName.toLowerCase() !== 'label') return ;
				let obj = {} ;
				obj[keyParam] = $(ev.target).attr('data-opt') ;
				this.hand.update(obj);
			});
		}

		_offClick(){
			this.$dom.off('click');
		}

		init ({conId = "#buttons" , options = [] , defType = void 0 , keyParam}){
			if(conId === undefined || keyParam === undefined){
				throw "没有相关的容器id"
			} 
			this.$dom = $(conId).css({
				float : 'right' ,
				display : 'inline-block'
			}); ;
			// 默认选中第一项
			this.create(options , this.hand.getParams(keyParam) || defType);
			this._offClick()
			this._onClick(keyParam); ;
		}	

		create(options , defType){ 
			let sons = '' ;
			options.map((item , index) => {
				let str = `class='btn'` ;
				if(defType === item['optType']) str = `class='btn active'` ;
				sons += `<label ${str} data-opt=${item['optType']}><input type="radio" name="options">${item['optName']}</label>`;
			});
			this.$dom.html(`<div class='btn-group buttons' data-toggle='buttons'>${sons}</div>`);
		}

	}
	return Buttons ;
});