Mailchimp = (function(){
	var initialize = function(){
		$('#newsletter-dialog form').submit(function(e){
			e.preventDefault();

			var url = $(this).attr('action') + '.json';
			var data = $(this).serialize();
			var posting = $.post( url, data );

			posting.done(function( response ) {
				if(response.success){
					$('.dialog').trigger('close_lightbox');
					$('body').prepend('<div class="flash success">'+response.flash+'</div>');
					Flash.initialize();
				}else{
					$('#newsletter-dialog .error').remove();
					$('#newsletter-dialog form input[type="submit"]').before('<div class="error">'+response.flash+'<br/></div>');
				}
			});
		});
	};

	return {
		initialize: function(){
			initialize();
		}
	};
}());
