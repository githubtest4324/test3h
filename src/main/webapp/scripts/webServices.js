test3hipsterApp.factory('WebServices', ['$http', function($http){
	return {
		ecom: {
			requests: {
				RequestsByCriteriaWs: function($scope, input, outputRef){
					$http({
						method: 'POST',
						url: 'app/rest/requests/byCriteria',
						data: input
					}).success(function (response) {
						var realOutputRef = '$scope.' + outputRef;
						var expr =  realOutputRef + "=response";
						eval(expr);
					}).error(function (response) {
						console.log(response);
					});
				},
				CustomersByCriteriaWs: function($scope, input, outputRef){
					$http({
						method: 'POST',
						url: 'app/res/customers/byCriteria',
						data: input
					}).success(function (response) {
						var realOutputRef = '$scope.' + outputRef;
						var expr =  realOutputRef + "=response";
						eval(expr);
					}).error(function (response) {
						console.log(response);
					});
				}
			}
		}
	};
}]);
