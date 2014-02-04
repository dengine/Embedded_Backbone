FooterPlacement = (function(){

	var initialize = function(){
		setTimeout(resizeFooter,1);
        $(window).resize(resizeFooter);

	   
	};

	 // Dynamically resize footer to fill page, IE8 doesn't like this.
	   var resizeFooter = function(){
	        var windowHeight = window.innerHeight;
	        var $footer = $('footer');
	        // 107 references a negative margin in header - you'll need to account for this if necessary
	        var footerHeight =  windowHeight - $footer.offset().top;
	        if(footerHeight>50){
	        	$footer.height(footerHeight);	
	        } else {
	        	$footer.height(38);	
	        }
	        
	    }

	return {
		initialize: function(){
			initialize();
			// $(window).resize(function(){
			// 	initialize();
			// });
		}
	};

}());
