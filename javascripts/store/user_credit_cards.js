UserCreditCards = (function(){
	
	var initialize = function(){
		$('input[name="existing_card"]').change(function(){
			if(parseInt($(this).val(), 10)){
				$(this).closest('li').find('fieldset').hide();
			}else{
				$(this).closest('li').find('fieldset').show();
			}
		});
		$('input[name="existing_card"]').first().click();
	};

	return {
		initialize: function(){
			if($('#existing-credit-cards').length > 0){
				initialize();
			}
		}
	};
}());