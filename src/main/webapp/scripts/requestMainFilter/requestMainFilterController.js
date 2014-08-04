'use strict';

test3hipsterApp.controller('requestMainFilterController', ['$scope', 'RequestMainFilter',
    function ($scope, RequestMainFilter) {
        $scope.data = {
            customerSearchModel: {
                grid: {
                    customers: [
                        {id: 'id1', address: null, name: 'Customer1', code: 'code1', asString: 'Cust1 str'},
                        {id: 'id2', address: null, name: 'Customer2', code: 'code2', asString: 'Cust2 str'},
                        {id: 'id3', address: null, name: 'Customer3', code: 'code3', asString: 'Cust3 str'},
                        {id: 'id4', address: null, name: 'Customer4', code: 'code4', asString: 'Cust4 str'}
                    ]
                }
            }
        };
        $scope.actions = {
            openModal: function(target){
                    $('#' + target).modal();
            },
            refreshGrid: function(target){
                //todo: refresh grid's datasource
            }
        };

        $scope.gridOptions= {
            customerSearch: {
                customerGrid: {
                    multiSelect: true,
                    enableRowSelection: true,
                    selectWithCheckboxOnly: true,
                    showSelectionCheckbox: true,
                    enableColumnResize: true,
                    enableColumnReordering: true,
                    enableSorting: true,
                    headerRowHeight: 35,
                    footerRowHeight: 35,
                    rowHeight: 35,
                    keepLastSelected: true,
                    enablePaging: false,
                    showFooter: false,

                    AICI AM RAMAS. sa compar valorile din test.js din proiectul vechi, sa vad de ce nu se afiseaza grid-ul
//                    data: 'data.customerSearchModel.grid.customers'
                    data: 'customerFilter.grid.data'
                }
            }
        };


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
                name: null,
                code: null
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
            grid: {
                options: {
                    selectable: false,
                    multiSelection: false,
                    columnResize: true,
                    columnReorder: true,
                    sortable: false,
                    headerRowHeight: 35,
                    rowHeight: 35
                },
                ngGridOptions: {
                    multiSelect: null,
                    enableRowSelection: null,
                    selectWithCheckboxOnly: null,
                    showSelectionCheckbox: null,
                    enableColumnResize: null,
                    enableColumnReordering: false,
                    enableSorting: null,
                    footerRowHeight: null,
                    headerRowHeight: null,
                    rowHeight: null,
                    keepLastSelected: false,
                    enablePaging: false,
                    showFooter: false,
                    data: 'customerFilter.grid.data'
                },
                selectedItems: [],
                data: [
                    {name: 'Customer1', code: 'code1'},
                    {name: 'Customer2', code: 'code2'},
                    {name: 'Customer3', code: 'code3'},
                    {name: 'Customer4a', code: 'code4'}
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

        // requestMainFilter->customerFilter->grid
        $scope.initGrid_3423 = function () {

            // Multiselection
            $scope.customerFilter.grid.ngGridOptions.multiSelect = $scope.customerFilter.grid.options.multiSelection;
            $scope.customerFilter.grid.ngGridOptions.selectWithCheckboxOnly = $scope.customerFilter.grid.options.multiSelection;
            $scope.customerFilter.grid.ngGridOptions.showSelectionCheckbox = $scope.customerFilter.grid.options.multiSelection;

            // Selectable
            $scope.customerFilter.grid.ngGridOptions.enableRowSelection = $scope.customerFilter.grid.options.selectable;

            // Column resize
            $scope.customerFilter.grid.ngGridOptions.enableColumnResize = $scope.customerFilter.grid.options.columnResize;

            // Column reorder
            $scope.customerFilter.grid.ngGridOptions.enableColumnReordering = $scope.customerFilter.grid.options.columnReorder;

            // Sortable
            $scope.customerFilter.grid.ngGridOptions.enableSorting = $scope.customerFilter.grid.options.sortable;

            // Header row height
            $scope.customerFilter.grid.ngGridOptions.headerRowHeight = $scope.customerFilter.grid.options.headerRowHeight;

            // Row height
            $scope.customerFilter.grid.ngGridOptions.rowHeight = $scope.customerFilter.grid.options.rowHeight;


        };
        $scope.initGrid_3423();
    }]);

