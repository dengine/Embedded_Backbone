MobileTaxonDrop = (function(){
	var initialize = function(){
		$('.mobile-drop').click(function(){
			if($(this).hasClass('down')){
				$(this).parents('.sidenav').find('.taxons-list li').not('.current').hide();
				$(this).removeClass('down');
			} else {
				$(this).parents('.sidenav').find('.taxons-list li').show();
				$(this).addClass('down');
			}
			
		});
	}
	return {
		initialize: initialize
	}

}());