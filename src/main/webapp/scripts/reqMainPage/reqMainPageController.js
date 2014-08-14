'use strict';

test3hipsterApp.controller('reqMainPageController', ['$scope', 'ReqMainPageService',
    function ($scope, ReqMainPageService) {
		$scope.selectedCustomers = null;
		$scope.criteria = null;















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

        $scope.gridOpt= {
            data: 'myData',
            enablePaging: false,
            showFooter: false,
            //totalServerItems:'totalServerItems',
            enableColumnResize: true,
            enableColumnReordering: true,
            enableRowReordering: true,
            enableRowSelection: true,
            enableSorting: true,
            footerRowHeight: 30,
            headerRowHeight: 35,
            rowHeight: 35,
            keepLastSelected: false,
            multiSelect: true,
            selectWithCheckboxOnly: true,
            showSelectionCheckbox: true
        };
        
        $scope.gridOptions= {
            customerSearch: {
                customerGrid: {
                    data: 'data.customerSearchModel.grid.customers',
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
                }
            }
        };

    }]);

