var Fitfinder = (function(){
	
	var initialize = function(){
		 $.html5Loader({
		 	filesToLoad: fitfinder_assets,
		 	onBeforeLoad: function(){
		 	},
		 	onComplete: function(){
		 		Router.initialize();
		 	},
		 	onElementLoaded: function(){
		 	},
		 	onUpdate: function(percentage){
		 		$('.percentage-loaded').html(percentage);
		 	}
		 });
	}

	return {
		initialize: function(){
			if($('#fitfinder').length > 0){
				initialize()
			}
		}
	}
}())