
/*
* 订单详情／订单编辑公共模块
*/
define(["if!$" , "baseUtil"] , function($ , BaseUtil){
	const detailUrl = "/admin/order/detail" ;
	const backUrl = "/admin/order/doReturnSpu" ;
	class OrderDetail extends BaseUtil {
		constructor(){
			super() ;
		}
		/*
		* 设置编辑订单
		*/
		setOrderEdit(){
			// GET
			let mockData = {
			  "code": 0,
			  "message": "OK",
			  "data": {
			    "orderInfo":  {
			        "orderId": 1,
			        "orderSn": "OD170708",
			        "orderAmount": "32.5",
			        "customerName": "张三",
			        "orderStatus": "待归还",
			        "totalQuantity" : 15 ,
			        "backTotalQuantity" : 5 ,
			        "createTime": "2017-06-06 23:59:59",
			        "remark": "备注"
			      },
			     "listSpuInfo": [
			      {
			        "spuId": 1,
			        "spuSn": "OD170708",
			        "categoryName": "项链",
			        "unit_price": "1100",
			        "image_url":"httpd://wwww.kuandd.qwqweiqo",
			        "quantity": "11",
			        "backQuantity" : 2 ,
			        "returnQuantity": "9",
			      },
			      {
			        "spuId": 2,
			        "spuSn": "OD132708",
			        "categoryName": "戒指",
			        "unit_price": "155",
			        "image_url":"httpd://wwww.kuandd.qwqweiqo",
			        "quantity": "11",
			        "backQuantity" : 3 ,
			        "returnQuantity": "9",
			      },
			    ],
			  }
			} ;
			this.drawOrderTotal(mockData.data) ;
			this.drawOrderInfo(mockData.data);
		}
		/*
		* 绘制订单总计
		*/
		drawOrderTotal(data){
			let {
				orderInfo  = {}
			} = data ;
			let html = this.setTemplate("id_201706081051" , orderInfo) ;
			$("#order-total").html(html) ;
			this.submitRemark();
		}
		/*
		* 绘制订单总计
		*/
		drawOrderInfo(data){
			let {
				listSpuInfo = [] , orderInfo = {}
			} = data ;
			let columns = [
				{"data" : "image_url" , 
					mRender : function(data){
						return `<div class='tableImg fixAuto'>
                                	<img data-exif=${data} title='图片' onerror="this.src='/assets/img/auto.png'" src=${data} />
                              	</div>`;

					}
				},
        		{"data" : "spuSn"},
        		{"data" : "categoryName"},
        		{"data" : "unit_price"},
        		{"data" : "quantity"},
        		{"data" : "backQuantity"} 
			] ;
			if(location.href.toLowerCase().indexOf("edit") !== -1){
				columns.push(
					{"data" : "spuId" , 
	        			mRender : function(data , type , full){
	        				let {quantity , backQuantity} = full ;
	        				return `<a class="table-operation return" data-total=${quantity} data-back=${backQuantity} data-spu=${full['spuId']} style="background-color:#CC6666;">归还</a>`; 
	        			}
	        	});
			}
			this.drawDatable({
				data : listSpuInfo , 
				columns : columns
			});
			if(location.href.toLowerCase().indexOf("edit"))
				this.backQuantityFun();
		}
		// 归还点击
		backQuantityFun(conId = "#datatable-responsive"){
			$(conId).off("click").on("click" , "a" , (ev) => {
				ev.preventDefault() ;
				let obj = {} ;
				let params = {} ; backUrl ;
				params['orderId'] = this.params['orderId'] ;
				params['spuId'] = ev.target.getAttribute("data-spu") ;
				params['backQuantity'] = 1 ;

				console.log(params);

				//  // 前期不需要做数量填写
				// obj['total'] = ev.target.getAttribute("data-total") ;
				// obj['back'] = ev.target.getAttribute("data-back") ;
				// let html = this.setTemplate("id_201706081440" , obj) ;
				// $("#back-quantity-con").html(html);
				// $("#backQuantityModal").modal() ;
				// this.submitBack(ev.target.getAttribute("data-spu") || 1) ;
			}) ;
		}
		// 提交归还
		submitBack(spuId){
			$("#submit-quantity-button").off("click").on("click" , (ev) => {
				if(!ev.target.value){
					alert("请输入数量！") ;
					return ;
				}
				if(ev.target.value * 1 > ev.target.getAttribute("data-total")){
					alert("归还超限！");
					return ;
				}
				let params = {} ;
				params['orderId'] = this.params['orderId'] ;
				params['spuId'] = spuId ;
				params['backQuantity'] = ev.target.value ;
			}) ;
		}
		// 提交备注
		submitRemark(){
			if($("#submit-remark").length === 0) return ;
			$("#submit-remark").off("click").on("click" , (ev) => {
				let tVal = ev.target.getAttribute("data-value") ;
				if($(ev.target).prev().val() === tVal) return ;
				let params = {} ;
				params['remark'] = $(ev.target).prev().val() ;
				params['orderId'] = this.params['orderId'] ;
				console.log(params);
			});
		}
	}
	return OrderDetail ;
});