$(function(){
setTimeout(function() {
    $(".loading").fadeOut("fast");
    $(".wrap").css("display","block");
    $(".fontloader").css("display","none");
}, 10000);
});

$(window).on('load',function(){
    $(".loading").fadeOut("fast");
    $(".wrap").css("display","block");
    $(".fontloader").css("display","none");
});
