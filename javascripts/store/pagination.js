Paginate = (function(){

	var paginate = function(targetUL, i, pagContainer, itemClass){

		var ul = $(targetUL),
			i = i,
			pagContainer = $(pagContainer);
			
		if(itemClass === "undefined")
			var items = ul.children();
		else
			var items = ul.children(itemClass);
		var numItems = items.length;
		var numPages = Math.ceil(numItems/i);
		
		var j = 0;
		for (j;j<numPages;j++){
			var array = items.slice(j*i,(j+1)*i);
			$(array).each(function(){
				$(this).addClass("paginate-group paginate-group-"+(j+1));
			});
		}
		$(".paginate-group").not(".paginate-group-1").hide();

		pagContainer.empty();
		addPages(pagContainer, numPages, targetUL);
		History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        	 changePage();
    	});
  		changePage();

	}
	var changePage = function(){
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
        if(State){
        	$('.page-'+State.data.state).click();
        } else {

        }
	}
	var addPages = function(pagContainer, numPages, targetUL){
		var list = document.createElement('ul');
		$(list).addClass('pagination clearfix');
		var i = 0;
		var pageTitle = document.title;
		for(i; i<numPages; i++){
			var pageLi = document.createElement('li');
			var pageA = document.createElement('a');
			$(pageA).text(i+1).attr("href", "#").addClass('pagination-link page-'+(i+1));
			if (i==0){
				$(pageA).addClass('active')
			}
			$(pageA).click(function(event,i){
				return function(event){
					event.preventDefault();
					$(".pagination-link").removeClass("active");
					$(this).addClass("active");
					$(".paginate-group").hide();
					$(".paginate-group-"+(i+1)).show();
					 History.pushState({state:i+1}, pageTitle, "?page="+(i+1));
					$('html, body').animate({
						scrollTop: $(targetUL).offset().top - 50
					}, 300);
				}
			}(event,i));
			$(pageLi).append(pageA);
			$(list).append(pageLi);
		};

		var viewAll = document.createElement('li');
		var viewAllA = document.createElement('a');
		$(viewAllA).text("View All").attr("href", "#").addClass('pagination-link page-all').click(function(e){
			e.preventDefault();
			History.pushState({state:'all'}, pageTitle, "?page=all");
			$(".pagination-link").removeClass("active");
			$(this).addClass("active");
			$(".paginate-group").show();
		});

		$(viewAll).append(viewAllA);
		$(list).append(viewAll);
		if(numPages > 1){
			$(pagContainer).append(list);
		}

	};

	return {
		initialize: function(){
			//SET OUR DIFFERENT PAGINATES HERE
			
			// Press Releases
			if ($('ul.pink-dash-list').length > 0){
				paginate('.pink-dash-list', 5, '.pagination-container');
			}

			History.Adapter.bind(window, 'statechange', function() {
				var state = History.getState();

				if(state.data.productsPage) {
					var $link = $('.product-bar').find('.pagination a[href="' + state.data.href + '"]');
					$('#products-wrapper').html('<div class="loader"></div>');
					$('html, body').animate({
						scrollTop: $('#products-wrapper').offset().top
					});

					var $filters = $('.product-bar-filters');

					$.ajax({
						url: state.url,
						cache: true,
						data: {
							scope: $filters.find('select[name="sort"]:selected').val(),
							band: $filters.find('select[name="band"]:selected').val(),
							cup: $filters.find('select[name="cup"]:selected').val()
						},
						dataType: 'script',
						success: function(data) {
							$link.closest('.pagination').find('a').removeClass('active');
							$link.addClass('active');

							ProductInventory.initialize();
							QuickAdd.initialize();
							Forms.initialize();
							OptionValueImages.initialize();
						}
					});
				}
			});

			// make products paginate with AJAX
			$('.product-bar').find('.pagination').on('click', 'a', function(e) {
				var $this = $(this);
				e.preventDefault();

				History.pushState({productsPage: $this.text(), href: $this.attr('href')}, 'Products Page ' + $this.text(), $this.attr('href'));
			});
		}
	};
}());
