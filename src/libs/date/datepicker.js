
define([
  "if!$" ,
	'moment' ,
  'urllib' ,
  __uri('./daterangepicker.js')] ,
	function($ , moment , urllib , daterangepicker){
  var DatePicker = function( dateStart , dateEnd , paramsObj , dom = "#reportrange"){
        var cb = function(start, end) {
          //console.log(start.toISOString(), end.toISOString(), label);
          //$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
          $('span', dom).html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
        };

        var optionSet1 = {
          startDate: moment(dateStart) ,
          endDate: moment(dateEnd),
          minDate: '01/01/2015',
          maxDate: '12/31/2020',
          /*dateLimit: {
            days: 60
          },*/
          showDropdowns: true,
          showWeekNumbers: true,
          timePicker: false,
          timePickerIncrement: 1,
          timePicker12Hour: true,
          ranges: {
            //'本周'     : [moment().startOf('week') , moment()],
            '上周'     : [moment().subtract(moment().day() + 6 , "days") , moment().subtract( moment().day()  , 'days')],
            '本月'     : [moment().startOf('month') , moment()],
            '上月'     : [moment().startOf('month').subtract(1 , 'month')  , moment().subtract(1 , 'month').endOf('month') ],
            '过去30天' : [moment().subtract(30 , 'days') , moment().subtract(1 , 'days')] ,
            '过去六个月' : [moment().subtract(7 , 'month') , moment().subtract(1 , 'month')],
            '本年'     : [moment().startOf('year') , moment()] ,
            '上一年'     : [moment().subtract(1 , 'year').startOf('year') , moment().subtract(1 , 'year').endOf('year')]

          },
          opens: 'left',
          buttonClasses: ['btn btn-default'],
          applyClass: 'btn-small btn-primary',
          cancelClass: 'btn-small',
          format: 'MM/DD/YYYY',
          separator: ' to ',
          locale: {
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '起始日期',
            toLabel: '结束日期',
            //customRangeLabel: '选择日期',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
          }
        };
        
        //$('#reportrange span').html(moment().startOf('month').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD' ));

        // 初始的时间
        $('span', dom).html(dateStart + ' - ' + dateEnd);

        $(dom).daterangepicker(optionSet1, cb) ;

        $(dom).on('show.daterangepicker', function() {
          //console.log("show event fired");

          //console.log(moment().month(7).format('YYYY-MM'));
        });
        $(dom).on('hide.daterangepicker', function() {
          //console.log("hide event fired");
        });

        function deleteDatePick (){
          var pickArr = [].slice.call($('.daterangepicker')) ;
          /*pickArr.map((item , index) => {
            if(index !== 0) {
              $(item).remove();
            }
            console.log(item);
          });*/
        } 

        $(dom).on('apply.daterangepicker', function(ev, picker) {
          //console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
          //let hand = urllib();
          let { dateStart = "dateStart", dateEnd = "dateEnd" } = paramsObj || {
            "dateStart" : "dateStart",
            "dateEnd"   : "dateEnd"
          };
          let param = {};
          param[dateStart] = picker.startDate.format('YYYY-MM-DD');
          param[dateEnd] = picker.endDate.format('YYYY-MM-DD');
          urllib().update(param);
        });

        $(dom).on('cancel.daterangepicker', function(ev, picker) {
          //console.log("cancel event fired");
          let calLength = $('.calendar', dom).length ;
          $($('.calendar', dom)[calLength - 2]).prepend(`<h4 style='text-align:center'>开始日期</h4>`);
          $($('.calendar', dom)[calLength - 1]).prepend(`<h4 style='text-align:center'>结束日期</h4>`);
        });
        $('#options1').click(function() {
          $(dom).data('daterangepicker').setOptions(optionSet1, cb);
        });
        $('#options2').click(function() {
          $(dom).data('daterangepicker').setOptions(optionSet2, cb);
        });
        $('#destroy').click(function() {
          $(dom).data('daterangepicker').remove();
        });
        let calLength = $('.calendar').length ;
        $($('.calendar', dom)[calLength - 2]).prepend(`<h4 style='text-align:center'>开始日期</h4>`);
        $($('.calendar', dom)[calLength - 1]).prepend(`<h4 style='text-align:center'>结束日期</h4>`);

  }

	return DatePicker ;

});