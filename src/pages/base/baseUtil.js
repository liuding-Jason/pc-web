
/*
* 基础功能模块，将能够重复利用功能进行抽象封装
* 
*/

define([
	"if!$" ,
	"if!_" ,
	"ajax" , 
	"urlhand" , 
	"daterangepicker" ,
	"datepicker" ,
	"dataTable" ,
	__uri("../../common/require/template.js") ,
	__uri("./buttons.js")
	] , function($ , _ , Ajax , urlhand  , DatePicker , datepicker , dataTable , template , Buttons){
	class BaseUtil {
		constructor(){
			this.hand = urlhand() ;
			this.params = this.hand.getQuery() ;
			this.fileLoadFlag = false ;
		}
		// 初始化
		init(defOpt = {} , callback = function(){}){
			// 获取参数
			this.params = Object.assign(defOpt , this.params) ;
			callback() ;
		}

		/*
		* judge data
		*/
		judgeData(code , message){
			if(code * 1 !== 0) {
				alert(message);
				return false ;
			}
			return true ;
		}

		updateQuery(...args){
			return this._head.update(...args);
		}
		reload(...args){
			if(args.length > 0){
				this.updateQuery(...args);
			}else{
				window.location.reload(true);
			}
		}

		/*
		* 获取Ajax数据
		* @option -- 设置选项
		* @params -- 传递的参数值
		*/  
		getAjaxData(options = {} , params){
			return new Ajax(options).send(params) ;
		}

		// 绘制datatable数据
		drawDatable(params = {}){
			let {
				conId = "#datatable-responsive" ,  paging = true , info = true ,
				ordering = false , orderCol = 0 , data = [] , columns = []
			} = params ;
			if($(conId).length === 0){
				throw "conId is needed!" ;
			}
			$(conId).dataTable().fnDestroy();
			$(conId).DataTable({
				autoWidth	: true ,
			    info        : info,				// 设置是否显示表格左下角的信息
			    lengthChange: false,		    // 设置表格项是否长度可变
			    paging      : paging,				// 设置是否显示分页
			    pagingType	: "simple_numbers" ,// simple_numbers  full_numbers 	    
			    searching   : false,		    // 设置是否具有搜索功能
			    order       : [[orderCol, 'desc']],    // 设置默认排序 - 第0列 降序排列 asc
			    ordering    : ordering ,		// 设置是否启动排序
			    processing  : false,			// 是否显示处理过程
			    language   : dataTableUrl ,		// 设置提示语
			    bScrollCollapse : true ,
			    scrollX : true ,				// 设置是否显示水平滚动条
	        	data : data ,
	        	columns : columns 
	    	});
		}

		/*
			@function : 设置胶囊buttons
			@params - params 设置更新的参数，*详细参数列表请看./buttons.js*

			页面结构：
			<div id="buttons"></div>

			使用案例：
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
		*/
		setButtons(params = {}){
			new Buttons(params);
		}

		/*
			@function : 实现起止日期选择的控件，包括年／月／日
						例如：dateStart='2016-01-01' ， dateEnd='2016-08-31'
			@params   : newHash - 需要更新的新的hash值 例如：'#/home'

			页面结构：建议使用默认的选择器名称，否则需要修改该方法
				<div class="title_right">
			      <div id="reportrange" class="date-pick pull-right" style="">
			        <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
			        <span>December 30, 2014 - January 28, 2015</span> <b class="caret"></b>
			      </div>
			    </div>
		*/
		// 获取日期 - 年月日
		setDate(newHash = "#/"){
			let paramsObj = {
				"hash" :  newHash !== "#/" ? newHash : location.href.split("?")[0]
			};
			let {dateStart , dateEnd} = this.params ;
			DatePicker( dateStart , dateEnd , paramsObj);
			/* 设置默认时间 */
			$('.dateStart').html(dateStart) ;
			$('.dateEnd').html(dateEnd) ;
		}

		/*
			@funciton : 实现起止日期选择的控件，包括年／月 
						例如：dateStart='2016-01' ， dateEnd='2016-08'
			@params   : newHash - 需要更新的新的hash值 例如：'#/home'

			页面结构：建议使用默认的选择器名称，否则需要修改该方法
			    <div class="pull-right datapick-submit"><button class="btn btn-sm btn-success">查看</button></div>
			    <div class="input-daterange input-group">
			        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
			        <input type="text"  name="dateStart" readonly class="form-control dateStartInput" value="2016-02" />
			        <span class="input-group-addon"><i class="fa fa-arrows-h"></i></span>
			        <input type="text" name="dateEnd" readonly class="form-control dateEndInput" value="2016-07" />
			    </div>
		*/
		setMonthDate(newHash = void 0){
			let {dateStart , dateEnd} = this.params ;
			// init
			$('.dateStartInput').val(dateStart) ;
			$('.dateEndInput').val(dateEnd) ;

			!function(a){
				a.fn.datepicker.dates["zh-CN"] = {
					days : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六","星期日"] ,
					daysShort : ["周日","周一","周二","周三","周四","周五","周六","周日"] ,
					daysMin:["日","一","二","三","四","五","六","日"] , 
					months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
					monthsShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
					today:"今日",
					format:"yyyy年mm月dd日",
					weekStart:1,
					clear:"清空"
				}
			}(jQuery) ;

			$('.input-daterange').datepicker({
		        format  : 'yyyy-mm',
		        language: 'zh-CN',
		        autoclose: true,
		        minViewMode: 1,
		        duration: 'slow',
		        showAnim: 'fold' 
		    });

		    $('.date-format').click(function () {
		        var dateFormat  = $(this).attr('format');
		        $('input[name="date_format"]').val(dateFormat);
		        $('#trends-form').submit();
		    });

		    $(".datapick-submit").on("click" , ev => {
		    	event.preventDefault();
		    	this.hand.update({
		    		dateStart : $('.dateStartInput').val() ,
		    		dateEnd : $('.dateEndInput').val()
		    	}) ;
		    });
		}
		/*
		* 设置模版
		* 
		*/
		setTemplate(conId  , data){
			let obj = {conId , data} ; 
          	let {pathname , query} = this.hand.getLocation() ;
			if(!$.isEmptyObject(query)){
				data['paginateUrl'] = pathname + "?" + $.param(_.omit(query, 'pageNum','perpage')) + "&"
			}else{
				data['paginateUrl'] = pathname + "?" ;
			}
			return template.loadData(obj) ;
		}

		/*
		* fa-toggle-close
		*/
		triggerToggleClose(){
			$(".fa-toggle-close").trigger("click") ;
		}

		/*
		* 操作文件上传蒙版
		*/
		importFileModal(params = {}){
			let {
				modalId = "#importFileModal" , subBtnId = "#submit-file-button" , loadUrl = ""
			} = params ;
			$(modalId).modal() ;
			let _this = this ;
			let $body = $(".modal-body form", modalId) ;
	        $(".upload-file-name", $body).html("请选择文件") ;
	      	$(modalId).on("change","input[type='file']", function(){
	        	var files = this.files[0];
	        	var { type, name } = files;
	        	if(/\.csv$/i.test(name)){
		        	let $body = $(".modal-body form", modalId) ;
		        	$(".upload-file-name", $body).html(name) ;
		        	_this.fileLoadFlag = true ;
		        }else{
		        	alert(name + " 不是 CSV 格式文件\n请上传 CSV 格式文件");
		        	_this.fileLoadFlag = false
	        	}
	        	return false ;
	      	}) ;
	      	this.importAjaxFun(modalId , subBtnId , loadUrl) ;
		}
		// 实现上传功能
		importAjaxFun(modalId , subBtnId , loadUrl){
			$(subBtnId).off("click").on("click" , (ev) => {
				if(!this.fileLoadFlag){
					alert("请选择上传的文件！");
					return ;
				}
				if(loadUrl === ""){
					alert("上传失败！") ;
					this.reload() ;
					throw "loadUrl is needed in fileload!" ;
				}
				// TODO test
				console.log("loadFile");
				return ;
				let $body = $(".modal-body form", modalId);
        		let form = new FormData($body.get(0));
				this.getAjaxData({
	          		contentType: false,
	          		processData: false,
	          		forceSync: false,
	         		xhrFields: {
	            	withCredentials: true
	          		},
	          		crossDomain: true,
	          		mimeType : "multipart/form-data",
	          		url  : loadUrl
		        })
		        .send(form, false).then( ({message}) => {
		          alert(message);
		          this.reload() ;
		        }).catch(function(e){
		          let { data } = e;
		          let { errorList = [] } = data;
		          alert(errorList.join("\n"));
		        }) ;
			});
		}

		/*
		* 搜索框组件
		*/
		searchingInput(){
			$("#search-input-btn").off("click").on("click" , "button , span" , (ev) => {
				let input = $("#search-input-btn").find("input")[0] ;
				if(!$(input).val()) return ;
				this.hand.update({pageNum : 1 , spuSn : $(input).val()});
			});
		}

	}
	return BaseUtil ;
});