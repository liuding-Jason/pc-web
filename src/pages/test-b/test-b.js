/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/
define(["if!$"], function($){
  function home(){

    this.$body.text("hello , 这里是 test - b 页面");

    this.hideLoading();
  }
  return home;
});


