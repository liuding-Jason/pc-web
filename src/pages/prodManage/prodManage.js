/*
* 商品管理模块
*/

define(["if!$" , "baseUtil"] , function($ , BaseUtil){
	const prodList = "/admin/spu/list" ;
	const fileLoad = "/admin/spu/importData" ;
	const perpage = 20 ;

	class ProdManange extends BaseUtil {
		constructor(){
			super() ;
			this.init({
				perpage  :  perpage,
				pageNum  :  1 
			} , () => {
				this.getProdList();
			});
			// 附加功能
			this.uploadFile() ;
			this.downloadFile() ;
		}
		// 获取商品列表
		getProdList(defOpt){
			// let {dateStart , dateEnd} = this.params ;
			// this.getAjaxData({url : prodList} , {dateStart , dateEnd})
			// .then(({code = void 0 , data = {} , message = `${prodList} 请求失败！`}) => {
			// 	if(!this.judgeData(code , message)) return ;
			// 	this.drawProdList(data);
			// });

			let mockData = {
			  "code": 0,
			  "message": "OK",
			  "data": {
			    "countPage": 1000,
			    "listSpuInfo": [
			      {
			        "spuId": 1,
			        "thumbUrl": "_blank",
			        "spuSn": "ABCD123456",
			        "categoryName": "戒指",
			        "spuPrice": "2355.00"
			      },
			      {
			        "spuId": 2,
			        "thumbUrl": "_blank",
			        "spuSn": "ABCD123456",
			        "categoryName": "戒指",
			        "spuPrice": "2355.00"
			      },
			    ]
			  }
			}
			this.drawProdList(mockData.data);
		}
		// 绘制商品列表
		drawProdList(data){
			let {
				countPage = 100 , listSpuInfo = [] 
			} = data ;
			let {pageNum = 1 , perpage = 20} = this.params ;

          	let listHead = [{
            	label : 'thumbUrl' ,
            	text : "商品图片"
          	} , {
            	label : 'spuSn' ,
            	text : 'SPU编号'
          	} , {
            	label : 'categoryName' ,
            	text : '品类'
          	} , {
          		label : "spuPrice" ,
          		text : '销售价格'
          	}] ;
          	let listData = listSpuInfo.map((item) => {
	            let newItem = Object.assign({} , item) ;
	            newItem['thumbUrl'] = `<div class='tableImg fixAuto'>
	                                <img data-exif=${item['thumbUrl']} title='图片' onerror="this.src='/assets/img/auto.png'" src=${item['photos']} />
	                              </div>` ;
	            return newItem ;
          	});
			let html = this.setTemplate("id_201706060851" , {
				listHead , listData , countPage , pageNum  , perpage
	        }) ;
	        $("#product-list").html(html) ;
		}
		/*
		* 上传文件
		*/
		uploadFile(){
			$("#prod-upload").off("click").on("click" , (ev) => {
				ev.preventDefault() ;
				this.importFileModal() ;
			});
		}
		/*
		* 下载文件
		*/
		downloadFile(){
			$("#prod-download").off("click").on("click" , (ev) => {
				ev.preventDefault() ;
				// TODO test
				console.log("downloadFile") ;
				return ;
				window.location.href = "#/home" ;
			})
		}

	}

	return ProdManange ;

});