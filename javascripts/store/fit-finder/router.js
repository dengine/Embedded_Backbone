var Router = (function(){

	var appView,
		app_router;

	var AppRouter = Backbone.Router.extend({
		routes: {
			'':'showFitFinder',
			'step/:step_id': 'showStep',
			'results/':'showResults'
		},

		showFitFinder: function(){
			appView.render();
		},
		showResults: function(){
			appView.loadResults();
		},
		showStep: function(step_id){
			appView.loadStep(step_id);
		}
	});

	var initialize =  function(){
		appView = new AppView();
		Fitfinder.router = new AppRouter;
		Backbone.history.start({root: "/find-your-fit/", pushState: true});

		//If we are not on the index route, send us back to start
		if (Backbone.history.fragment != ''){
			window.location.hash = "";
		};
	};
	return {
		initialize: initialize
	}
}())