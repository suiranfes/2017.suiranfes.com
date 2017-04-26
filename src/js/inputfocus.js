$(document).ready(function(){
    $('input.-urlshare-inputurl')
		.focus(function(){
			$(this).select();
		})
		.click(function(){
			$(this).select();
			return false;
		});
}); 