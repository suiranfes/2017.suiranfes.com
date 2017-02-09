var isAndroidBrowser = false
var ua = window.navigator.userAgent
if (/Android/.test(ua) && /Linux; U;/.test(ua) && !/Chrome/.test(ua)) {
  isAndroidBrowser = true
}
$(function(){
  if(isAndroidBrowser == true){
    $('.loading').html('<p><a href="intent://suiranfes.com#Intent;scheme=https;action=android.intent.action.VIEW;end">タップでブラウザアプリを開きます。</a></p>');
    return false;
  }
});