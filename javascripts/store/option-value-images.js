OptionValueImages = (function(){
	var initialize = function(){
		$('.variant-options').on('change','input[name="2"]',function(){
			if($(this).closest('.quick-add').length > 0)
				quickAdd($(this));
			else
				productDetail($(this));
		});
	};
	var quickAdd = function($input){
		var product_id = parseInt($input.closest('.products-list-item').attr('id').replace('product_', ""), 10);
		option_value_id = $input.val();
		path = Routes.spree_product_image_json_path(product_id) + '.json';
		$.get( path, function( data ) {
			var image_path = null;
			$.each(data,function(i, item){
				if(item.image.option_value_id == option_value_id){
					image_path = item.image.product_list_path;
				}
			});
			if(image_path){
				$('#product_' + product_id + ' .option-value-image').attr('src',image_path);
				$('#product_' + product_id + ' .product-image .default').hide();
				$('#product_' + product_id + ' .product-image .option-value-image').show();
			}
		}, "json" );
	};

	var productDetail = function($input){
		var value_id = parseInt($input.val(), 10);
		$thumbnail = $('#thumbnails a[data-option-value="' + value_id + '"]');
		if($thumbnail.length > 0){
			var src = $thumbnail.first().attr('href');
			$('#main-image img').transition({"opacity":0, "duration":200}, function(){
				$(this).attr('src', src).transition({"opacity":1, "duration":200});
			});
			$('#product-thumbnails li').removeClass('selected');
			$thumbnail.first().closest('li').addClass('selected');
		}
	};


	return {
		initialize: function(){
			initialize();
		}
	};
}());
