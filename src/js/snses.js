function socialbutton(){

var thelabel = "";
  $('.btn-social').each(function(){
    thelabel = $(this).attr('data-label');
    $(this).addClass('btn-' + thelabel);
  });
$('.btn-social-action').on('click',function(){
  var thelabel = $(this).attr('data-label'),socialNw = "",socialAc = "";
  if(thelabel == "line-share"){
    socialNw = "LINE";
    socialAc = "share";
  } else if(thelabel == "tweet"){
    socialNw = "Twitter";
    socialAc = "Tweet";
  } else if(thelabel == "fbshare"){
    socialNw = "Facebook";
    socialAc = "share";
  } else if(thelabel == "gplusshare"){
    socialNw = "Google+";
    socialAc = "share";
  } else if(thelabel == "hatena"){
    socialNw = "HatenaBookmark";
    socialAc = "Bookmark";
  } else if(thelabel == "youtube"){
    socialNw = "HatenaBookmark";
    socialAc = "Bookmark";
  } else if(thelabel == "twitter-follow"){
    socialNw = "HatenaBookmark";
    socialAc = "Bookmark";
  } else {
    socialNw = "Unknown";
    socialAc = "Unknown";
  }
  ga('send', 'social', socialNw, socialAc, 'https://suiranfes.com/', {
    nonInteraction: false
  });
});

$('.btn-social-link').on('click',function(){
  ga('send', 'event', 'Social', 'Link', $(this).attr('data-label'), {
    nonInteraction: false
  });
});

window.gacb_gplusone = function(){
  ga('send', 'social', 'Google+', '+1', 'https://suiranfes.com/', {
    nonInteraction: false
  });
    if (data['state'] == 'on') {void(0);}

}

window.fbAsyncInit = function() {
  FB.Event.subscribe('edge.create',function(response){
    ga('send', 'social', 'Facebook', 'like', 'https://suiranfes.com/', {
      nonInteraction: false
    });
  });
};
}

$(document).ready(function(){
  socialbutton();
});

$(window).on('load',function(){
  FB.XFBML.parse();
});