/*
* 订单详情
*/
define([__uri("./orderDetail.js")] , function(OrderDetail){
	class OrderInfo extends OrderDetail {
		constructor(){
			super() ;
			this.init({} , () => {
				this.setOrderEdit();
			})
		}
	}
	return OrderInfo ;
});
