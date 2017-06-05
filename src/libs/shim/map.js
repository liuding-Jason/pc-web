define([],function(){
    class _Map{
        constructor(){
            let data = {};
            this.set = function(key, value){
                if(key){
                    data[key] = value;
                }
                return this;
            }
            this.get = function(key){
                return data[key] || "";
            }
            this.keys = function(){
                return Object.keys(data);
            }
            this.has = function(key){
                return data.hasOwnProperty(key);
            }
            this.delete = function(key){
                if(this.has(key)){
                    delete data[key];
                    return true;
                }else{
                    return false;
                }
            }
            this.forEach = function(callback){
                callback && this.keys().forEach( key =>{
                    callback(this.get(key), key);
                });
            }
        }
    }
	return _Map;
});