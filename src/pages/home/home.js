/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/01
*/
define(["if!$", "css!" + __uri("./home.less")], function($){
  function home(){

    this.$body.text("hello , 这里是 home 页面");

    this.hideLoading();
  }
  return home;
});


