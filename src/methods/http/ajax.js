
/*
* 发送ajax的模块
*/
define([ "if!$" , __uri("./md5.js"), "map"] , function($ , Md5, _Map){
	let cache = new _Map();
	class Ajax{
		//构造 ajax
		constructor(param = {} , casheFlag = true){
           	let defOpt = {
                cache : casheFlag,
                type : "POST" ,
                url  : conf.BASEURL ,
                dataType : "json" ,
                contentType: "application/json; charset=utf-8", 
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                mimeType : void 0,
                processData: void 0,
                forceSync : void 0
            }
            for(let key in defOpt){
                //判断这个属性是否存在
                param.hasOwnProperty(key) && (defOpt[key] = param[key]);
            }

            this.getDefaultOption = function(){
            	return defOpt;
            };
        }
        // 服务端session失效后，记录用户访问记录
        remeberHash(){
            window.sessionStorage.setItem(KUANDDHREF , location.href);
        }
        judge({code = void 0 , data = {} , message = "请求失败！"}){
            // alert(message);
            switch(parseInt(code)){
                case 0:
                    return true;
                case 902000001:
                    this.remeberHash();
                    location.href = location.href.split("/")[0] + '/#/login' ;
                    return false;
                    //该错误上传文件成功，文件内容格式有误
                case 902900007:
                    return true;
                default:
                    return alert(message);
            }
        }

        //发起请求
        send(data, stringify = true){
        	const _that = this;
        	return new Promise((resolve,error) => {
        		let param = Object.assign({
        			//请求数据
        			data : (stringify === true) ? JSON.stringify(data) : data || ""
        		}, {
        			//回调函数
	            	success : function(result){
                        if(!_that.judge(result)){
                            return error(result);
                        } 
                        if(_that.key && param['cache'] !== false){
                            cache.set(_that.key, result);
                        }
                        let { version = "" } = result;
                        let { pathname, hash } = window.location;
                        if(version && conf.NODE_ENV != "dev"){
                            version = '/www/home_' + version + '.html';
                            if(version != pathname){
                                return window.location.href = version + hash;
                            }
                        }
                        resolve(result);
	            		
	            		//缓存量大于 15 时删除前5次缓存
	            		if(cache.size > 15){
	            			let _keys = [...cache.keys()];
	            			_keys.slice(0,5).forEach(id => cache.delete(id));
	            		}
	            	},
	            	error : error
	            	//基本参数配置
	            }, this.getDefaultOption());

        		if(param.data && param['cache'] !== false && stringify === true){
        			_that.key = Md5(param.data);
        			if(cache.has(_that.key)){
        				resolve(cache.get(_that.key));
        				return false;
        			}
        		}
                delete param['cache'] ;
        		_that.ajax = $.ajax(param) ;
        	});
        }
        // 终止请求
        abort(){
        	this.ajax.abort();
        }
        // 销毁缓存，清除缓存
        destroy(){
        	cache.delete(this.key);
        }
	}
	return Ajax;
});