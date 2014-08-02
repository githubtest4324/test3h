'use strict';

test3hipsterApp.controller('requestMainFilterController', ['$scope', 'RequestMainFilter',
    function ($scope, RequestMainFilter) {
        $scope.myData = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
        ];
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
            search: {
                gridId: null,
                perform: function () {
                    $scope.customerFilter.search.before();
                    // todo: refresh grid
                },
                before: function () {
                    $scope.customerFilter.search.gridId = 'customerGrid';
                }
            },
            customerGrid: {
                options: {
                    multiSelect: true,
                    enablePaging: false,
                    showFooter: false,
                    enableColumnResize: true,
                    enableColumnReordering: true,
                    enableRowReordering: true,
                    enableRowSelection: true,
                    enableSorting: true,
                    footerRowHeight: 30,
                    headerRowHeight: 35,
                    rowHeight: 35,
                    keepLastSelected: false,
                    selectWithCheckboxOnly: true,
                    showSelectionCheckbox: true,
                    data: 'customerFilter.customerGrid.data'
                },
                data: [
                    {name: 'Customer1'},
                    {name: 'Customer2'},
                    {name: 'Customer3'},
                    {name: 'Customer4'}
                ],
                idsOut: null,
                fieldName: null,
                valuesOut: null,
                selectedIds: {
                    idsOut: null,
                    perform: function () {
                        // todo: get selected ids
                    }
                },
                selectedValues: {
                    fieldName: null,
                    valuesOut: null,
                    perform: function () {
                        // todo: get selected values
                    }
                }
            }
        };
    }]);

