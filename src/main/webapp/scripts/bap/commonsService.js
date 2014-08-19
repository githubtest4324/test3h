test3hipsterApp.factory('CommonsService', function(){
	return {
		actions: {
			openModal: function (target) {
				var jqPath = '#'+target.replace('.', ' #');
				$(jqPath).modal();
			},
			closeModal: function (target) {
				var jqPath = '#'+target.replace('.', ' #');
				$(jqPath).modal('hide');
			},
			refreshGrid: function (target) {
				//todo: refresh grid's datasource
			},
			bind: function ($scope, source, destination) {
				var realSource = '$scope.' + source;
				var realDestination = '$scope' + destination;
				var expr = realSource + "=" + realDestination;
				eval(expr);
			}
		}
	};
});