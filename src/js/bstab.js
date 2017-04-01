function getUrlVars(){
    var vars = [], max = 0, hash = "", array = "";
    var url = window.location.search;

    hash  = url.slice(1).split('&');    
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');    //keyと値に分割。
        vars.push(array[0]);    //末尾にクエリ文字列のkeyを挿入。
        vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
    }

    return vars;
}

var vars = getUrlVars();
$(function(){
    $( '[role="tablist"] a[href="#' + vars.tab + '"]' ).tab('show');
});