function getUrlVars(url){
    var vars = [], max = 0, hash = "", array = "";

    hash  = url.slice(1).split('&');    
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');
        vars.push(array[0]);
        vars[array[0]] = array[1];
    }

    return vars;
}

function bstab(vars){
    $( '[role="tablist"] a[href="#' + vars.tab + '"]' ).tab('show');
    $('#' + vars.modal + '').modal('show');
    $('#' + vars.collapse + '').collapse('show')
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        $('a[href="' + $(e.relatedTarget).attr("href") + '"]').removeClass('active')
        $('a[href="' + $(e.target).attr("href") + '"]').addClass('active')
    })
    return "bstab";
}


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
    ga('send', 'pageview', window.location.pathname.replace(/^\/?/, '/') + window.location.search);
    if(vars.collapse){$(window).scrollTop( document.getElementById( vars.collapse ).getBoundingClientRect().top + window.pageYOffset - Number($('nav').height()) - 80 );}
    $('iframe[pre-src]').each(function(){$(this).attr("src",$(this).attr("pre-src"))})
    require('./bootstrap.js');
});

// returnに作ったトランジションを設定します。
Barba.Pjax.getTransition = function() {
  return GreatBarba;
};
 
Barba.Pjax.start();
Barba.Prefetch.init();
});