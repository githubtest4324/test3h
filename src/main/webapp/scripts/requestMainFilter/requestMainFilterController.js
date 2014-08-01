'use strict';

test3hipsterApp.controller('requestMainFilterController', ['$scope', 'RequestMainFilter',
    function ($scope, RequestMainFilter) {
        $scope.criteria = {
            customers: null,
            code: null,
            creationDateStart: null,
            creationDateEnd: null
        };
    }]);

