Validate = (function(){

	var initialize = function(){
		$('.validate-form').each(function(){
			$(this).validate();

		});
		$('#contact_order_number').rules('add', {
			required: function(){
				return $('#contact_topic_id').val() == "2"
			}
		});
	};
	return {
		initialize: initialize
	};

}());