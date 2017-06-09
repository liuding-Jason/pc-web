/*
* 订单编辑
*/

define([__uri("./orderDetail.js")] , function(OrderDetail){
	class OrderEdit extends OrderDetail {
		constructor(){
			super() ;
			this.init({} , () => {
				this.setOrderEdit();
			})
		}
	}
	return OrderEdit ;
});