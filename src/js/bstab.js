var vars = getUrlVars();
$(function(){bstab()});

$(window).on('load',function(){
    if(vars.collapse){$(window).scrollTop( document.getElementById( vars.collapse ).getBoundingClientRect().top + window.pageYOffset - Number($('nav').height()) - 80 );}
});