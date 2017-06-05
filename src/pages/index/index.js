/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/02
*/

define(["if!$", "urllib", "if!bootstrap",],function($, Urllib){
  let urllib = new Urllib();
  $("#loginSubmit").on("click", function(){
    urllib.configure(__uri("/home.html"));
  });
});