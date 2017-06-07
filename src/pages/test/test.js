/*
* 测试模块
*/
define([
	"if!$" ,
	"baseUtil"
	] , function($ , _ , BaseUtil){

	class Test extends BaseUtil {

		constructor(){
			super() ;
			this.testButton() ;	
			this.testTemplate() ;
			this.testTablePage() ;
		}
		// 测试buttons 组件
		testButton(){
			this.setButtons({
				conId : "#buttons" ,
				options : [{
					optType : 'mom',
					optName : '单月'
				} , {
					optType : 'acm' ,
					optName : '累加'
				}] ,
				defType : 'mom' ,
				keyParam : 'reference'
			});
		}
		// 测试模版
		testTemplate(){
			let html = this.setTemplate("id_201706062041" , {data : {
				sumCustomers : 1 ,
				sumSalers : 2 , 
				sumOrders : 3 ,
				sumSalesAmount : 4 ,
				sumOrderQuantity : 5 ,
				sumTotalWeight : 6 , 
				sumPurchaseAmount : 7 ,
				sumGrossProfit : 8 ,
				sumMarginRate : 9 
			}}) ;
			$("#data-screen").html(html) ;
		}

		// 测试分页表格
		testTablePage(){
			/*
			* 这里count listShopData是测试数据，实际开发中，将接入服务端数据
			*/
		  	let count = 1000 , 
		  		listShopData = [{
		  			name : "1" ,
		  			brandClass : "A" ,
		  			photos : ""
		  		} , {
		  			name : "2" ,
		  			brandClass : "A+" ,
		  			photos : ""
		  		} , {
		  			name : "3" ,
		  			brandClass : "C" ,
		  			photos : ""
		  		}] ;
          	let {pageNum = 1 , perpage = 20} = this.params ;
          	let listHead = [{
            	label : 'photos' ,
            	text : "图片"
          	} , {
            	label : 'name' ,
            	text : '商铺'
          	} , {
            	label : 'brandClass' ,
            	text : '品牌等级'
          	}] ;
          	let {pathname , query} = this.hand.getLocation() ;
          	query['a'] = 1 ;
          	let newListShopData = listShopData.map((item) => {
	            let newItem = Object.assign({} , item) ;
	            newItem['photos'] = `<div class='tableImg fixAuto'>
	                                <img data-exif=${item['photos']} title='图片' onerror="this.src='/assets/img/auto.png'" src=${item['photos']} />
	                              </div>` ;
	            return newItem ;
          	});
          	$('#shop-detail').html("") ;
			let html = this.setTemplate("id_201706060851" , {
				listHead : listHead ,
	            listData : newListShopData ,
	            countPage : count ,
	            pageNum : pageNum ,
	            perpage : perpage ,
	            paginateUrl : pathname +"?" + $.param(_.omit(query, 'pageNum','perpage')) + "&"
	        }) ;
	        $("#shop-detail").html(html) ;
		}	
	}

	return Test ;
})