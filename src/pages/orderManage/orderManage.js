
/*
* 订单管理模块
*/

define(["if!$" , "baseUtil"] , function($ , BaseUtil){

	class OrderManage {
		constructor(){
			super() ;
			this.init({
				dateStart : "2017-06-06" ,
				dateEnd : "2017-06-06"
			} , () => {
				this.getOrderList();
			})
		}

		/*
		* 获取订单列表
		*/

	}


	return OrderManage ;
});