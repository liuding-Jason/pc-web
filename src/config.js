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
	    // 删除旧的
	    // 修改
	    /* dataTable数据加载提示语url */
	    "dataTableUrl"	 		: 	    "../../vendors/datatable/dataTable.cn.json",
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
	window.conf = config;
	return config;
});