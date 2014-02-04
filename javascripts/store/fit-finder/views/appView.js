var AppView = (function(){

	var userFit;
	var startedBeg;

	var AppView = Backbone.View.extend({
		el: '#fitfinder',
		events: {
			'click .fit-me':'start'
		},
		initialize: function(){
			userFit = new Fit();
		},
		loadResults: function(){

			var that = this;
			$('.fade-out, .fade-out-start').transition({"opacity":0}, function(){
				var results = new ResultsView({model: userFit})
				results.render();
				that.$el.html(results.el);
			});
		},
		loadStep: function(step_id){
			dataLayer.push({'page': '/find-your-fit/'+(Number(step_id)),
							'title': 'Find Your Fit - Step '+(Number(step_id)),
							'event': 'fit_step_' + (Number(step_id))});
			var that = this;
			$('.fade-out, .fade-out-start').transition({"opacity":0}, function(){
				var nextStep = new StepView({model: userFit});
				nextStep.render(step_id);

				that.$el.empty().append(nextStep.el);
				_.defer(function(){
					that.$el.find('.fade-out').transition({"opacity": 1})	
				});
			});
		},
		render: function(){
			var that = this;
			this.$el.find(".loader").transition({"opacity":0}, function(){
				var template = Handlebars.compile($("#intro").html());
				that.$el.html(template);
				_.defer(function(){
					that.$el.find(".fade-out-start").transition({"opacity":1});
					Dialogs.initialize();
				});
				
			});		
		},
		start: function(){
			this.loadStep(1);
		}
	});

	return AppView;
}());