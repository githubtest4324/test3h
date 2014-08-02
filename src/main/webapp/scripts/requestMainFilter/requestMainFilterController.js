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
                            $scope.customerFilter.multiSelect = false;
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
            namesOut: null,
            criteria: {
                name: null
            },
            search:{
                gridId: null,
                perform: function(){
                    $scope.customerFilter.search.before();
                    // todo: refresh grid
                },
                before: function(){
                    $scope.customerFilter.search.gridId = 'customerGrid';
                }
            },
            customerGrid: {
                multiSelect: true,
                idsOut: null,
                fieldName: null,
                valuesOut: null,
                selectedIds: {
                    idsOut: null,
                    perform: function(){
                        // todo: get selected ids
                    }
                },
                selectedValues: {
                    fieldName: null,
                    valuesOut: null,
                    perform: function(){
                        // todo: get selected values
                    }
                }
            }
        };
    }]);

