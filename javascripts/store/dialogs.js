Dialogs = (function(){

	var initialize = function(){
		// regular dialog links
		// $('#wrapper').on('click', '.dialog-link', function(e) {
		$('.dialog-link').click(function(e){
			var id = $(this).data('dialog');
			$('.dialog').trigger('close_lightbox');
			$(id).lightbox_me({
				centered: true,
				onLoad: function() {
					$(id).find('input:first').focus();
				},
				locked: $(id).hasClass('locked') ? true : false
			});
			e.preventDefault();
		});
		//show the sign in dialog if it's there
		if($('#sign-in-dialog.locked').length > 0){
			$('#sign-in-dialog').lightbox_me({
				centered: true,
				onLoad: function() {
					$('#sign-in-dialog').find('input:first').focus();
				},
				locked: true
			});
		}

		if($('#create-account-dialog.prompt').length > 0){
			$('#create-account-dialog').lightbox_me({
				centered: true,
				onLoad: function() {
					$('#create-account-dialog').find('input:first').focus();
				},
				locked: true
			});
		}
	};

	return {
		initialize: function(){
			initialize();
		}
	};
}());

