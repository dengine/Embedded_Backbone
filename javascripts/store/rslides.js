$(function(){
	if($(".rslides").length > 0){
		$(".rslides").responsiveSlides(
		{
			auto: false,
			pager: false,
			nav: true,
			speed: 500,
			namespace: "callbacks",
		});
	}
});
