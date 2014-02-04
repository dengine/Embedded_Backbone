Faqs = (function(){

	var initialize = function(){
		$('.faq-cat:not(.faq-cat-0)').hide();

		$('.faq-nav li').first().addClass('current');

		$('.faq-nav a').click(function(e){
			e.preventDefault();
			var clickedCat = $(this).data('cat');
			$('.faq-cat').hide()
			$('.'+clickedCat).show();
			$('.faq-nav li').removeClass('current');
			$(this).parent('li').addClass('current');
		});

		$('.faq-question').click(function(e){
			e.preventDefault();
			if($(this).hasClass('faq-question-down')){
				$(this).removeClass('faq-question-down');
				$(this).next('.faq-answer').slideUp();
			} else {
				$(this).addClass('faq-question-down');
				$(this).next('.faq-answer').slideDown();
			}
		});
	}

	return {
		initialize: function(){
			initialize();
		}
	}

}());


