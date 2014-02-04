Analytics = (function(){

	var initialize = function(){
		$('#skip-fitting-form').submit(function(){
			bra_size = $('select[name="band"]').val() + $('select[name="cup"]').val();
			var reason = ($(this).closest("#skip-fitting.dialog").length > 0) ? 'Fitted_in_Store' : 'Buying_for_Her';
			// ga('send', 'event', reason, 'Submitted', bra_size, {'dimension2': bra_size});
			dataLayer.push({'reason': reason,
							'bra_size': bra_size,
							'event': 'Skip_Fitting_Form'});
		});
		// $('#new_spree_user').submit(function(){
		// 	ga('send', 'event', 'Account_Creation', 'Submitted');
		// });
		// $('#new_contact').submit(function(){
		// 	id = $('#contact_topic_id').val();
		// 	text = $('#contact_topic_id option[value="'+id+'"]').text();
		// 	ga('send', 'event', 'Contact_Form', 'Submit', text);
		// });
		$('.faq-question').click(function(){
			var topic = $(this).text();
			// ga('send', 'event', 'FAQ', 'Topic', topic);
			dataLayer.push({'topic': topic,
							'event': 'FAQ'});
		});
	};

	return {
		initialize: function(){
			initialize();
		}
	};

}());
