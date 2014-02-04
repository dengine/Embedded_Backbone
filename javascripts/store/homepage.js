Homepage = (function(){
	var initialize = function(){

		var bg_shift = "270px";
		//Find Your Perfect Bra
		$(".bra-type-text").hover(function(){
			if($(window).width()>768 && $(window).width()<959){
				bg_shift = "236px";
			}
			$(this).prev().css("background-position", bg_shift);
		}, function(){
			$(this).prev().css("background-position", "0px");
		});


		$(".bra-type a:first-child").hover(function(){
			if($(window).width()>768 && $(window).width()<959){
				bg_shift = "236px";
			}
			$(this).css("background-position", bg_shift);
		}, function(){
			$(this).css("background-position", "0px");
		});

		// Bra Problems
		if($(".bra-problems").size()>0){
			$("#info1").fadeIn();
			$(".hover-spot").on('mouseover', function(){
				var num = $(this).data("item");
				$(".info").not("#info"+num).fadeOut(200).promise().done(function(){
					$("#info"+num).fadeIn(200);
				})
			});
			$("#change-view").click(function(){
				$(this).toggleClass('clicked');
				$(".bra-model").toggleClass('model-back');
				$(".back").toggle();
				$(".front").toggle();

			});
		}
	};

	return {
		initialize: function(){
			initialize();
		}
	};
}());
