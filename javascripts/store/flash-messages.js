Flash = (function(){
	var flash = function(){
		setTimeout(function(){
			$('.flash').fadeOut(1000);
		},3000);
	}

	return {
		initialize: function(){
			if($('.flash').length > 0){
				flash();
			}
		}
	}
}());