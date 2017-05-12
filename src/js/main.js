window.jQuery = $ = require('jquery');
Tether = require('tether');
UAparser = require('ua-parser-js');
Barba = require('barba.js');


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



require('./open');
require('./bootstrap');
require('./blockoldbrowsers');
require('./loading');
require('./bstab');
require('./suiranfes-updates');
require('./snses');
require('./inputfocus');
require('./iframe-loader');
require('./jquery-yycountdown');
require('./barba_set.js');