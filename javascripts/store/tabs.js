Tabs = (function(){
	return {
		initialize: function(){
			$('.tag').click(function(event, i){
				
					event.preventDefault();
					$('.tag').removeClass("active");
					$(this).addClass("active");
					if(window.innerWidth<960){
						$(this).appendTo('.tag-container');	
					}
					var tab = $(this).data("tab");
					$('.tab').removeClass("active");
					$("."+tab).addClass("active");
					
				
			});
			$('.tag.active').click();
		}
	}

}())