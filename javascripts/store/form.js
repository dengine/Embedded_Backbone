Forms = (function(){
	var initialize = function(){
		setCheckboxes();
		setSelectboxes();
	}

	var setCheckboxes = function(){
		$('label').has('input[type="radio"]').click(function(){
			$(this).siblings().removeClass('is-checked');
			$(this).addClass('is-checked');
		});
		$('label.is-checked').click();
	}

	var setSelectboxes = function(){
		$('select').not('#checkout select').selectBoxIt({
			autoWidth: false,
			downArrowIcon: "icon-arrow-down"
		});

		// $('.quick-add').mouseleave(function(event){
		// 	if(event.target != this){ return true; }
		// 	$(event.target).find('select').data("selectBox-selectBoxIt").close();
		// })
	}

	return {
		initialize: function(){
			initialize();
		}
	}
}())
