$(document).ready(function(){

var GreatBarba = Barba.BaseTransition.extend({
  start: function() {
    //startはトランジションが起動した直後の一番最初に呼び出される。
 
    //promise.allを使うと、配列で渡された処理が全て終わった後に.thenを実行。
    //この場合は.newContainerLOadingと.fadeOutが終わってから.thenが実行される。
    Promise
    .all([this.newContainerLoading, this.fadeOut()])
    .then(this.fadeIn.bind(this));
  },
 
  fadeOut: function() {
    //古いページコンテンツに対して行う処理。
    //ここでは、animateを使って、fadeoutさせている。
    $('#navbar').collapse('hide')
    $(this.oldContainer).removeClass('animated fadeIn').removeClass('animated zoomOut');
    $(this.newContainer).removeClass('animated fadeIn').removeClass('animated zoomOut');
    return $(this.oldContainer).addClass('animated zoomOut').promise();
  },
 
  fadeIn: function() {
    //startに記述したallによって、fadeOutが終わったらこのfadeIn関数が呼び出されている。
 
    var _this = this;
    //ここでのnewContainerは、ajaxで読み込まれてきた新しい方の.barba-containerにあたる。
    var $el = $(this.newContainer);
 
    //こちらも新しいbarba-containerの初期設定。
    //visiblityがあるのは、デフォルトではこれがhiddenになってるっぽいから。
    $el.css({
      visibility : 'visible'
    }).addClass('animated fadeIn');
    _this.done()
  },
});
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    // jquery-pjaxから借りた
    var $newPageHead = $( '<head />' ).html(
        $.parseHTML(
            newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
          , document
          , true
        )
    );
    var headTags = [ // 更新になってほしいタグ
        "meta[name='keywords']"
      , "meta[name='description']"
      , "meta[property^='og']"
      , "meta[name^='twitter']"
      , "title"
    ].join(',');
    $( 'head' ).find( headTags ).remove(); // タグを削除する
    $newPageHead.find( headTags ).appendTo( 'head' ); // タグを追加する

    $('.-index-middle .list-group-item').eq(6).on("click", function(){
        $('.-index-middle .list-group-item').eq(6).hide();
        $('.-index-middle .list-group-item:nth-child(n+8)').slideDown();
    });
    $('.-index-middle .list-group-item:last-child').on("click", function(){
        $('.-index-middle .list-group-item:nth-child(n+8)').hide();
        $('.-index-middle .list-group-item').eq(6).slideDown();
    });
    document.body.scrollTop = 0;
    var vars = getUrlVars(window.location.search);
    bstab(vars);
    if(vars.collapse){$(window).scrollTop( document.getElementById( vars.collapse ).getBoundingClientRect().top + window.pageYOffset - Number($('nav').height()) - 80 );}
    $('iframe[pre-src]').each(function(){$(this).attr("src",$(this).attr("pre-src"))})
    $('.-index-timer').yycountdown({
        endDateTime   : '2017/06/03 12:00:00',  //カウントダウン終了日時
        unit          : {d: '日', h: '時間', m: '分', s: '秒'},  //カウントダウン単位
        complete      : function(_this){  //カウントダウン完了時のコールバック
                      _this.find('.yycountdown-box').html("開催中!!");
                    }
    });
    require('./bootstrap.js');
    ga('send', 'pageview', window.location.pathname.replace(/^\/?/, '/') + window.location.search);
});

// returnに作ったトランジションを設定します。
Barba.Pjax.getTransition = function() {
  return GreatBarba;
};
 
Barba.Pjax.start();
Barba.Prefetch.init();
});