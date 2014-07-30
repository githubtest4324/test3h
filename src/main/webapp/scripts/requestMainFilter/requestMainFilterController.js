'use strict';

test3hipsterApp.controller('RequestMainFilterController', ['$scope', 'RequestMainFilter',
    function ($scope, RequestMainFilter) {
        $scope.customers = null;
        $scope.code = null;
        $scope.creationDateStart = null;
        $scope.creationDateEnd = null;

    }]);
