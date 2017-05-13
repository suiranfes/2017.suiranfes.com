function getUrlVars(){
    var vars = [], max = 0, hash = "", array = "";
    var url = window.location.search;

    hash  = url.slice(1).split('&');    
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');
        vars.push(array[0]);
        vars[array[0]] = array[1];
    }

    return vars;
}

function bstab(){
    $( '[role="tablist"] a[href="#' + vars.tab + '"]' ).tab('show');
    $('#' + vars.modal + '').modal('show');
    $('#' + vars.collapse + '').collapse('show')
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        $('a[href="' + $(e.relatedTarget).attr("href") + '"]').removeClass('active')
        $('a[href="' + $(e.target).attr("href") + '"]').addClass('active')
    })
    return "bstab";
}



var vars = getUrlVars();
$(function(){bstab()});

$(window).on('load',function(){
    if(vars.collapse){$(window).scrollTop( document.getElementById( vars.collapse ).getBoundingClientRect().top + window.pageYOffset - Number($('nav').height()) - 80 );}
});