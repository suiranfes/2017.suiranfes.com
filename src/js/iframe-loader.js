$(window).on('load',function(){
    $('iframe[pre-src]').each(function(){$(this).attr("src",$(this).attr("pre-src"))})
});