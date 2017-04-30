$(window).on('load',function(){
    $('iframe[pre-src]').attr("src",$(this).attr("pre-src"))
});