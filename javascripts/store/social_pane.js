SocialPane = (function(){
	var initialize = function(){
		$('#social-tab img, .mobile-social a').click(function(e){
			e.preventDefault();
			var widget = $(this).attr('widget');
			if($('#social-pane').hasClass('expanded')){
				if($('.social-widget.' + widget).hasClass('active')){
					togglePane();
				}else{
					$('.social-widget').removeClass('active');
					$('.social-widget.' + widget).addClass('active');
				}
			}else{
				$('.social-widget.' + widget).addClass('active');
				togglePane();
			}
		});
		$(document).mouseup(function(e){
			var container = $('#social-pane');
			if(!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass('expanded')){
				togglePane();
			}
		});
		$('.social-close').click(function(e){
			e.preventDefault();
			togglePane();
		});
	};

	var togglePane = function(){
		$pane = $('#social-pane');
		if($pane.hasClass('expanded')){
			$pane.animate({
				left: "-315px"
			}, 500, function(){
				$('.social-widget').removeClass('active');
			});
		}else{
			$('#social-pane').animate({
				left: "0px"
			}, 500);
		}
		$pane.toggleClass('expanded');
	};
	return {
		initialize: function(){
			initialize();
		}
	};
}());

