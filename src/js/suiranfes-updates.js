$(document).ready(function(){
    $('.-index-middle .list-group-item').eq(6).on("click", function(){
        $('.-index-middle .list-group-item').eq(6).hide();
        $('.-index-middle .list-group-item:nth-child(n+8)').slideDown();
    });
    $('.-index-middle .list-group-item:last-child').on("click", function(){
        $('.-index-middle .list-group-item:nth-child(n+8)').hide();
        $('.-index-middle .list-group-item').eq(6).slideDown();
    });
});