'use strict';

test3hipsterApp.controller('RequestMainFilterController', ['$scope', 'RequestMainFilter',
    function ($scope, RequestMainFilter) {
        $scope.customers = undefined;
        $scope.code = undefined;
        $scope.creationDateStart = undefined;
        $scope.creationDateEnd = undefined;

    }]);
