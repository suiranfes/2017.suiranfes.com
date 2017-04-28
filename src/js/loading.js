function suiranfes_loaded(){
    if(!nosupport){
        $(".loading").fadeOut("fast");
        $(".wrap").css("display","block");
        $(".fontloader").css("display","none");
    }
}

$(function(){
    setTimeout(suiranfes_loaded, 10000);
});

$(window).on('load',suiranfes_loaded);