/*
* 用于配置SPA应用中路由的配置
*/

define([__uri("./config.basis.js")],function({ HOST, API, Version, NODE_ENV }){
	var config = {
		"NODE_ENV"				: 	NODE_ENV,
	    // KPI 文件导入
	    "kpiUPLOADORCSV"        :     `${API}/api/${Version}/kpi_target_import.php`,
	    // KPI 文件下载
	    "kpiDownlaodCSV"        :     `${API}/api/${Version}/kpi_target_export.php`,
	    //导入 CSV
	    "UPLOADORCSV"           :        `${API}/api/${Version}/reorder_refer_import.php`,
	    //导出 CSV
	    "DOWNLOADCSV"           :        `${API}/api/${Version}/reorder_refer_export.php`,

	    /* hostUrl配置文件 */
	    "HOST" 					:       `${HOST}` ,
	    /* url配置文件 */
	    "APIROOT"	   	 		:  		 `${API}/api/${Version}/`,
	    "BASEURL"	   	 		:  		 `${API}/api/${Version}/index.php`,
	    "dingDataExport" 		:     	 `${API}/api/${Version}/ding_data_export.php`, // 钉钉数据导出
	    "FILEIMPORT" 	 		:   	 `${API}/api/${Version}/order_track_import.php`,
	    "UPLOADORDERDATA"       : 		 `${API}/api/${Version}/order_detail_import.php`,
	    "DistributionLoadUrl"   :        `${API}/api/${Version}/distribution_detail_import.php`,
	   	"ShipmentLoadUrl"       :        `${API}/api/${Version}/shipment_detail_import.php`,
	    "DOWNLOADCSVURL" 		: 		 `${API}/api/${Version}/chain_export.php`,
	    "DOWNLOADMULTCSV"		: 		 `${API}/api/${Version}/top_sales_export.php?type=multiple`,
	    "DOWNLOADSINGCSV"		: 		 `${API}/api/${Version}/top_sales_export.php?type=single` ,
	    "DOWNLOADSHOPURL" 		: 	  	 `${API}/shop/export_info.php`,
	    "homeDataUrl"   		: 		 "../../server/data/detailData.json",
	    "detailDataUrl" 		: 		 "../../server/data/data1.json",
	};
	/* dataTable数据加载提示语url */
	config['dataTableUrl'] = {
		"sProcessing":   "处理中...",
		"sLengthMenu":   "显示 _MENU_ 项结果",
		"sZeroRecords":  "没有匹配结果",
		"sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		"sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
		"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
		"sInfoPostFix":  "",
		"sSearch":       "搜索:",
		"sUrl":          "",
		"sEmptyTable":     "表中数据为空",
		"sLoadingRecords": "载入中...",
		"sInfoThousands":  ",",
		"oPaginate": {
		    "sFirst":    "首页",
		    "sPrevious": "上页",
		    "sNext":     "下页",
		    "sLast":     "末页"
		},
		"oAria": {
		    "sSortAscending":  ": 以升序排列此列",
		    "sSortDescending": ": 以降序排列此列"
		}
	} ;
	window.conf = config;
	return config;
});