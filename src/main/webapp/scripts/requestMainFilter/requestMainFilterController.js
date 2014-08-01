'use strict';

test3hipsterApp.controller('requestMainFilterController', ['$scope', 'RequestMainFilter',
    function ($scope, RequestMainFilter) {
        $scope.criteria = {
            customer: {
                ids: null,
                names: null,
                openCustomerFilter: {
                    viewId: 'customerFilter',
                    viewParameters: {
                        multiSelect: false //Aici am ramas: cum transfer multiselect la view.
                    },
                    viewOutput: null,
                    perform: function () {
                        $('#' + $scope.criteria.customer.openCustomerFilter.viewId).modal();
                    }
                }
            },
            code: null,
            creationDateStart: null,
            creationDateEnd: null,
            customerFilter: {

            }
        };
    }]);

