Thumbnails = (function(){
	var initialize = function(){
		$('#product-thumbnails li').unbind('mouseout');
		$('#product-thumbnails li').mouseenter(function(e){
			$('#product-thumbnails li').removeClass('selected');
			$(this).addClass('selected');
			$(this).find('a').click();
		});
	};

	return {
		initialize: function(){
			initialize();
		}
	};
}());
