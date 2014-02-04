MobileNav = (function(){

	var initialize = function(){
		$wrapper = $("#wrapper");
		$dropdown = $(".mobile-dropdown");
		$open = $(".mobile-nav-btn");
		$close = $(".mobile-nav-close");
		$subpage = $(".mobile-shop-url");
		start();
	}
	var start = function(){
		$open.click(function(){
			$dropdown.animate({ 'left' : '0' }, "slow");
		});
		$close.click(function(){
			$dropdown.animate({ 'left' : '-75%' }, "slow");
		});
		$subpage.click(function(){
			$(".mobile-nav-shop-sub").animate({ 'right' : '0%' }, "slow");
		});
		$(".mobile-nav-shop-sub header").click(function(){
			$(".mobile-nav-shop-sub").animate({ 'right' : '-100%' }, "slow");
		});
	}
	return {
		initialize: initialize
	}
}());