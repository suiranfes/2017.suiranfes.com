function suiranfes_chkandro(){

  var isOldAndroidBrowser = false;
  var ua = window.navigator.userAgent;
  if (/Android/.test(ua) && /Linux; U;/.test(ua) && !/Chrome/.test(ua)) {
    isOldAndroidBrowser = true;
  }

  return isOldAndroidBrowser

}

$(function(){

  if(suiranfes_chkandro() == true){
    $('.loading').html('<p><a href="intent://suiranfes.com#Intent;scheme=https;action=android.intent.action.VIEW;end">タップでブラウザアプリを開きます。</a></p>');
    throw new Error('古いアンドロイドの埋め込みブラウザを検出しました。以降のDOMツリー構築後に行う処理を中止します。');
  }

});

$(window).on('load',function(){

  if(suiranfes_chkandro() == true){
    throw new Error('古いアンドロイドの埋め込みブラウザを検出しました。以降のデータ読み込み終了後に行う処理を中止します。');
  }

});