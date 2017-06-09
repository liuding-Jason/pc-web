
/*
* 会员编辑页面
*/

define(["if!$" , "baseUtil"] , function($ , BaseUtil){
	const userDetail = "/admin/user/detail" ;
	const userEdit = "/admin/user/doEdit" ;

	class MemEdit extends BaseUtil{
		constructor(){
			super() ;
			this.init({} , () => {
				this.setMemberDetail();
			});
		}
		/*
		* 设置会员详情
		*/
		setMemberDetail(){
			let mockData = {
			  "code": 0,
			  "message": "OK",
			  "data": {
			    "userInfo": {
			        "userId": 1,
			        "userFace": "http://a.com/1.jpg",
			        "phoneNumber": "13800138000",
			        "nickName": "张三丰",
			        "genderId": "2",
			        "realName": "张三",
			        "industryId": "1",
			        "companyName": "尚品云智",
			        "postId": "2",
			        "provinceId": 1,
			        "cityId": 11,
			        "districtId": 111,
			        "birthDate": "1990-12-10",
			        "levelId": 1,
			        "expireDate": "2018-08-19",
			        "remark": "备注"
			    },
			    "listGenderInfo":[
			        {
			          "text": "男" ,
			          "value": 1
			        },
			        {
			          "text": "女",
			          "value": 2
			        },
			    ],
			    "listIndustyInfo":[
			        {
			          "text": "IT互联网",
			          "value": 1
			        },
			        {
			          "text": "文化/艺术",
			          "value": 2
			        },
			    ],
			    "listProvinceInfo":[
			        {
			          "text": "北京",
			          "value": 1
			        },
			        {
			          "text": "山东",
			          "value": 2
			        },
			    ],
			    "listPostInfo":[
			      {
			       'value':1 ,
			       'text':"培训师"
			      } ,
			      {
			       'value':2 ,
			       'text':"教师"
			      }
			    ] ,
			    "listCityInfo":[
			      {
			    	"text":"北京" ,
			    	"value":22
			      }
			    ],
			    "listDistrict":[
			      {
			    	"text":"朝阳" ,
			    	"value":22
			      },
			      { 
			    	"text":"昌平" ,
			      	"value":22
			      },
			    ],
			    "listLevelInfo":[
			        {
			          "text": "普通会员",
			          "value": 1
			        },
			        {
			          "text": "银牌会员",
			          "value": 2
			        },
			    ],
			  }
			}
			this.drawMemberDetail(mockData.data);
		}
		// 绘制会员详情
		drawMemberDetail(data = {}){
			let html = this.setTemplate("id_201706081650" , data) ;
			$("#member-detail").html(html);
			this.submitEditFun();
		}
		// 提交编辑
		submitEditFun(){
			$(".edit-submit-btn").off("click").on("click" , (ev) => {
				let nodes = $("#member-detail").find("input[name],select[name]") ;
				let obj = {} ;
				[].slice.call(nodes).forEach((item) => {
					let name = item.getAttribute('name') ;
					obj[name] = item.value ;
				});
				let params = Object.assign(obj , this.params);
				console.log(obj) ;
			});
		}
	}
	return MemEdit ;
});