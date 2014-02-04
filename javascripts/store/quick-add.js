QuickAdd = (function(){
	var $productImage;
	var initialize = function(){
		$productImage = $('.product-image');
		addHandlers();
	}
	var addHandlers = function(){

		$productImage.mouseenter(function(event){
			if($(event.target).is('.variant-option-values')){ 
				return false; 
			} else {
				
				$(this).find('.quick-add').stop(true,false).animate({"bottom":"0px"}, function(){
					$(this).parents('.product-image').css({"overflow":"visible"});
				});	
			}
			
		});
		$productImage.mouseleave(function(event){
			if($(event.target).is('.variant-option-values')){ 
				return false; 
			} else {
				$(this).css({"overflow":"hidden"}).promise().done(function(){
					$(this).find('.quick-add').stop(true,false).animate({"bottom":"-100%"});		
				});
				
			}
			
		});
	}
	return {
		initialize: function(){
			initialize();
		}
	};
}());