
/*
* 订单管理模块
*/

define(["if!$" , "moment" , "baseUtil"] , function($ , moment , BaseUtil){
	const perpage = 20 ;
	class OrderManage extends BaseUtil{
		constructor(){
			super() ;
			this.init({
				dateStart : "2017-06-01" ,
				dateEnd : moment().format("YYYY-MM-DD") ,
				perpage : perpage , 
				pageNum : 1 
			} , () => {
				this.getOrderList();
			})
			this.setDate() ;
			this.searchingInput("请输入客户名称／销售订单号" , "#search-input-con");
		}

		/*
		* 获取订单列表
		*/
		getOrderList(){
			// //可以对参数进行筛选
			// let {dateStart , dateEnd , perpage , pageNum , spuSn} = this.params ;
			// this.getAjaxData({url : prodList} , this.params)
			// .then(({code = void 0 , data = {} , message = `${prodList} 请求失败！`}) => {
			// 	if(!this.judgeData(code , message)) return ;
			// 	this.drawOrderList(data);
			// }) ;
			let mockData = {
				  "code": 0,
				  "message": "OK",
				  "data": {
				    "countPage": 1000,
				    "listOrderInfo": [
				      {
				        "orderId": 1,
				        "orderSn": "OD170708",
				        "orderAmount": "32.5",
				        "order_total" : 3 ,
				        "customerName": "狗蛋",
				        "orderStatus": "待归还",
				        "createTime": "2017-06-06 23:59:59",
				        "remark": "备注"
				      },
				      {
				        "orderId": 2,
				        "orderSn": "OD131568",
				        "orderAmount": "32.5",
				        "order_total" : 2 ,
				        "customerName": "狗剩",
				        "orderStatus": "待归还",
				        "createTime": "2017-06-06 23:59:59",
				        "remark": "备注"
				      },
				      {
				        "orderId": 2,
				        "orderSn": "OD131568",
				        "orderAmount": "32.5",
				        "order_total" : 2 ,
				        "customerName": "狗剩",
				        "orderStatus": "逾期未归还",
				        "createTime": "2017-06-06 23:59:59",
				        "remark": "备注"
				      } ,
				      {
				        "orderId": 2,
				        "orderSn": "OD131568",
				        "orderAmount": "32.5",
				        "order_total" : 2 ,
				        "customerName": "狗剩",
				        "orderStatus": "已删除",
				        "createTime": "2017-06-06 23:59:59",
				        "remark": "备注"
				      }
				    ],
				    "statusMap": {
				      "5": "新建",
				      "1": "待归还",
				      "2": "逾期未归还",
				      "3": "已归还",
				      "4": "已删除",
				    }
				  }
			}
			this.drawOrderStatus(mockData.data);
			this.drawOrderList(mockData.data);
		}
		// 绘制订单状态列表
		drawOrderStatus(data){
			let {
				statusMap = {}
			} = data ;
			let listData = [] ;
			Object.keys(statusMap).forEach((item) => {
				listData.push({
					id : item ,
					value : statusMap[item]
				});
			}) ;
			this.setSelectList({
				conId : "#status-list" ,
				listData : listData ,
				showAll : true
			});
		}

		// 绘制订单列表
		drawOrderList(data){
			let {
				countPage = 100 , listOrderInfo = [] 
			} = data ;
			let {pageNum = 1 , perpage = 20} = this.params ;
          	let listHead = [{
            	label : 'orderSn' ,
            	text : "订单编号"
          	} , {
            	label : 'order_total' ,
            	text : '商品数量'
          	} , {
            	label : 'orderAmount' ,
            	text : '订单金额'
          	} , {
          		label : "customerName" ,
          		text : '客户名称'
          	}, {
          		label : "orderStatus" ,
          		text : "订单状态"
          	} , {
          		label : "createTime" ,
          		text : "下单时间"
          	} , {
          		label : "remark" ,
          		text : "备注"
          	} , {
          		label : "manage" ,
          		text : "操作"
          	}] ;
          	let listData = listOrderInfo.map((item) => {
	            let newItem = Object.assign({} , item) ;
	            newItem["orderStatus"] === "逾期未归还" 
	            ? newItem["orderStatus"] = `<span style="color:#FFAF44;">${newItem['orderStatus']}</span>`
	            : newItem["orderStatus"] === "已删除"
	            ? newItem["orderStatus"] = `<span style="color:#FF3B45;">${newItem['orderStatus']}</span>`
	            : "" ;
	            newItem["manage"] = `<a class="table-operation" href="#/orderInfo?orderId=${newItem['orderId']}">查看详情</a>&nbsp;
	            					<a class="table-operation" href="#/orderEdit?orderId=${newItem['orderId']}" style="background-color:#FFAF44;">编辑</a>&nbsp;`;
	            return newItem ;
          	});
			let html = this.setTemplate("id_201706060851" , {
				listHead , listData , countPage , pageNum  , perpage
	        }) ;
	        $("#product-list").html(html) ;
		}
	}
	return OrderManage ;
});