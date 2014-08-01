'use strict';

test3hipsterApp.controller('requestMainFilterController', ['$scope', 'RequestMainFilter',
    function ($scope, RequestMainFilter) {
        $scope.requestMainFilter = {
            criteria: {
                customer: {
                    ids: null,
                    names: null,
                    openCustomerFilter: {
                        viewId: null,
                        viewParameters: {
                            multiSelect: false
                        },
                        viewOutput: null,
                        perform: function () {
                            $scope.requestMainFilter.criteria.customer.openCustomerFilter.before();
                            $('#' + $scope.requestMainFilter.criteria.customer.openCustomerFilter.viewId).modal();
                        },
                        before: function () {
                            $scope.requestMainFilter.criteria.customer.openCustomerFilter.viewId = 'customerFilter';
                        },
                        after: function () {

                        }
                    }
                },
                code: null,
                creationDateStart: null,
                creationDateEnd: null
            }
        };
        $scope.customerFilter = {
            multiSelect: null,
            idsOut: null,
            namesOut: null
        };
    }]);

