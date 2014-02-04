var ResultsView = (function(){

	var ResultsView = Backbone.View.extend({
		tagName: 'div',
		className: 'results',
		events: {
			'click .shop-now':'checkUser',
			'click .sign-in' : 'loginFrom'
		},
		checkUser: function(event){
			if($('#create-account-dialog').length>0){
				event.preventDefault();
				var band = this.model.get('band');
				var cup = this.model.get('cup');
				$('.spree_user_band_size').val(band);
				$('.spree_user_cup_size').val(cup);
				$('#create-account-dialog').lightbox_me({
					centered: true,
					onLoad: function() {
						$('#create-account-dialog').find('input:first').focus();
					},
					locked: false
				});
			}
		},
		loginForm: function(){
			$('.dialog').trigger('close_lightbox');
			$('#fit-sign-in-dialog').lightbox_me({
				centered: true,
				onLoad: function() {
					$(id).find('input:first').focus();
				},
				locked: false
			});
		},
		initialize: function(){
		
		},
		loadResults: function(){

		},
		render: function(){
			var band = this.model.get('band');
			var cup = this.model.get('cup');

			var encodedCup = cup.replace("/", "-");
			var relatedProducts;

			var that = this;
			$.getJSON("/most-popular/"+band+"/"+encodedCup+".json").done(function(data){
				relatedProducts = data;
				var url = Routes.spree_save_user_sizes_path(band, encodedCup);
				
				$(data).each(function(){
					this.product.url = url;
				});
				var template = Handlebars.compile($("#result").html());
				var rendered = template({bandsize: band, cupsize: cup, error: that.model.get('error'), url: url, relatedProducts: relatedProducts});
				that.$el.empty().html(rendered);
				$('.fade-out').transition({"opacity": 1});
				that.afterRender();
			});
			dataLayer.push({'page': '/find-your-fit/results',
							'title': 'Find Your Fit - Results',
							'event': 'fit_step_results'});
			var answerStrings = this.model.answerStrings;
			$(answerStrings).each(function(i){
				if(i>0){
					dataLayer.push({'question': 'Q'+i,
							'answer': this,
							'event': 'find_your_fit'});
					// ga('send', 'event', 'find_your_fit', 'Q'+i, this);
				}
				
			});
			// ga('send', 'event', 'find_your_fit', 'Recommended_Size', band+cup, {'dimension1': band+cup});
			dataLayer.push({'question': 'Recommended Size',
							'answer': band+cup,
							'event': 'find_your_fit_recommended_size'});
			// Set up skip url
			var skipUrl = Routes.spree_session_shop_path(band, cup);
			$('#skip-url').attr('href', skipUrl);
		},
		afterRender: function(){
			Forms.initialize();
		}
	});



	return ResultsView;
}());
