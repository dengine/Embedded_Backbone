UserAddresses = (function(){
	
	var initialize = function(){
		$('input.user-address').change(function(){
			$form = $(this).closest('fieldset').find('.address-form')
			if(parseInt($(this).val(), 10)){
				$form.hide();
				$form.find('.required').removeClass('required').addClass('required-disabled');
			}else{
				$form.show();
				$form.find('.required-disabled').removeClass('required-disabled').addClass('required');
			}
		});
		$('fieldset#billing .user-address').first().click();
		$('fieldset#shipping .user-address').first().click();
	};

	return {
		initialize: function(){
			if($('.user-address').length > 0){
				initialize();
			}

		}
	};
}());