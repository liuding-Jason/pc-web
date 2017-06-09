
/*
* 会员管理模块
*/

define(["if!$" , "baseUtil"] , function($ , BaseUtil){
	const userList = "/admin/user/list" ;
	const userDelete = "/admin/user/doDetete" ;

	const perpage = 20 ;
	class MemManage extends BaseUtil {
		constructor(){
			super() ;
			this.init({
				pageNum : 1 ,
				perpage : perpage
			} , () => {
				this.setMemeberList();
			}) ;
			this.searchingInput("请输入昵称／手机号" , "#search-input-con");
		}
		/*
		* 设置会员列表
		*/
		setMemeberList(){
			// //可以对参数进行筛选
			// let {dateStart , dateEnd , perpage , pageNum , spuSn} = this.params ;
			// this.getAjaxData({url : prodList} , this.params)
			// .then(({code = void 0 , data = {} , message = `${prodList} 请求失败！`}) => {
			// 	if(!this.judgeData(code , message)) return ;
			// 	this.drawMemeberList(data);
			// }) ;
			let mockData = {
			  "code": 0,
			  "message": "OK",
			  "data": {
			    "countPage": 1000,
			    "listUserInfo": [
			      {
			        "userId": 1,
			        "userFace": "http://a.com/1.jpg",
			        "realName": "张三",
			        "genderId": "1",
			        "phoneNumber": "13800138000",
			        "levelId": "1",
			        "remark": "备注"
			      },
			      {
			        "userId": 2,
			        "userFace": "http://a.com/2.jpg",
			        "realName": "李四",
			        "genderId": "1",
			        "phoneNumber": "13800138001",
			        "levelId": "1",
			        "remark": "备注"
			      },
			    ],
			    "genderMap": {
			      "1": "男",
			      "2": "女"
			    },
			    "levelMap": {
			      "1": "普通会员",
			      "2": "银牌会员",
			      "3": "金牌会员",
			      "4": "钻石会员",
			      "5": "至尊会员",
			    }
			  }
			} ;
			this.drawLevelList(mockData.data);
			this.drawMemeberList(mockData.data);
		}
		// 绘制会员等级列表
		drawLevelList(data){
			let {
				levelMap = {} 
			} = data ;
			let listData = [];
			Object.keys(levelMap).forEach((item) => {
				listData.push({
					id : item ,
					value : levelMap[item]
				});
			});
			this.setSelectList({
				conId : "#level-list" ,
				listData : listData ,
				showAll : true ,
				key : 'levelId'
			});
		}

		// 绘制列表
		drawMemeberList(data){
			let {
				countPage = 100 , listUserInfo = [] , genderMap = {} , levelMap = {}
			} = data ;
			let {pageNum = 1 , perpage = 20} = this.params ;
          	let listHead = [{
            	label : 'userFace' ,
            	text : "头像"
          	} , {
            	label : 'realName' ,
            	text : '姓名'
          	} , {
            	label : 'genderId' ,
            	text : '性别'
          	} , {
          		label : "phoneNumber" ,
          		text : '手机号'
          	}, {
          		label : "levelId" ,
          		text : "会员等级"
          	} , {
          		label : "remark" ,
          		text : "备注"
          	} , {
          		label : "manage" ,
          		text : "操作"
          	}] ;
          	let listData = listUserInfo.map((item) => {
	            let newItem = Object.assign({} , item) ;
	            newItem["userFace"] = `<div class='tableImg fixAuto'>
		                                <img data-exif=${item['userFace']} title='图片' onerror="this.src='/assets/img/auto.png'" src=${item['photos']} />
		                              </div>` ;
	            newItem["genderId"] = genderMap[newItem['genderId']] ;
	            newItem["levelId"] = levelMap[newItem['levelId']] ;
	            newItem["manage"] = `<a class="table-operation" href="#/memEdit?userId=${newItem['userId']}&keywords=${newItem['phoneNumber']}" style="background-color:#FFAF44;">编辑</a>&nbsp;
	            					<a class="table-operation delete" data-user=${newItem['userId']} style="background-color:#CC6666;">删除</a>`;
	            return newItem ;
          	});
			let html = this.setTemplate("id_201706061933" , {
				listHead , listData , countPage , pageNum  , perpage
	        }) ;
	        $("#member-list").html(html) ;
	        this.deleteUerFun() ;
		}
		// 删除用户
		deleteUerFun(){
			$("#member-list").on("click" , "a[class*='delete']" , (ev) => {
				ev.preventDefault();
				let userId = ev.target.getAttribute("data-user") ;
				console.log(userId) ;
			})
		}

	}
	return MemManage ;
});