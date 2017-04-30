function suiranfes_loaded(){
    if(!nosupport){
        $(".loading").fadeOut("fast");
    }
}

$(function(){
    setTimeout(suiranfes_loaded, 10000);
});

$(window).on('load',suiranfes_loaded);