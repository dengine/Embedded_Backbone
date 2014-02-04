Filter = (function(){

	var filters;

	var reload = function($filters, container, callback){
		var values = {};
		$filters.each(function(){
			values[$(this).attr('name')] = $(this).val();
		});
		url = buildUrl(values);
		if(url){
			// var loader = $('.ajax-loader');
			var items = $(container).children().not('.ajax-loader');
			// items.css('opacity','0.5');
			// loader.show();

			// TODO: this is a hack since I don't know how to use this listen crap -Will
			items.remove();
			$('#products-wrapper').prepend('<div class="loader"></div>');
			$.ajax({
				url: url,
				data: {
					page: $('.pagination').find('.active').text(),
				},
				success: function( data ) {
					results = $(data).find(container).contents();
					$(container).html(results);
					$('#products-wrapper').find('.loader').remove();
					Paginate.initialize();
					ProductInventory.initialize();
					QuickAdd.initialize();
					$('select').not('#checkout select').selectBoxIt({
						autoWidth: false,
						downArrowIcon: "icon-arrow-down"
					});
					callback();
				}
			});
		}

	};

	var buildUrl = function(values){
		if(values.cat && values.band && values.cup && values.sort){
			// products cat filter
			return Routes.spree_shop_sort_taxon_path(values.sort, values.band, values.cup, values.cat);
		}else if(values.band && values.cup && values.sort){
			// products filter
			return Routes.spree_shop_sort_path(values.sort, values.band, values.cup);
		}else{
			return false;
		}
		
	};

	var listen = function(filters, container, callback){
		$filters = $(filters);
		$filters.change(function(){
			reload($filters, container, callback);
		});
	};
	
	return {

		initialize: function(){
			//SET OUR DIFFERENT FILTERS HERE
			if ($('div[data-hook="homepage-products"]')){
				listen('.product-bar-filters select, .product-bar-filters [type="hidden"]', '#products', ProductInventory.initialize);
			}
			
		}
	};
}());