'use strict';

test3hipsterApp.controller('reqMainPageController', ['$scope', 'ReqMainPageService', '$translate', 'CommonsService',
	function ($scope, ReqMainPageService, $translate, CommonsService) {
		$scope.data = {
			reqMainPage: {
				criteria: {
					customers: null
				},
				searchCustomer: {
					criteria: null,
					customerGrid: [
						{id: 'id1', address: {id: 1, name: 'addr1', city: null, stati: null, asString: 'addr1As'}, name: 'Customer1', code: 'code1', asString: 'Cust1 str'},
						{id: 'id2', address: null, name: 'Customer2', code: 'code2', asString: 'Cust2 str'},
						{id: 'id3', address: null, name: 'Customer3', code: 'code3', asString: 'Cust3 str'},
						{id: 'id4', address: null, name: 'Customer4', code: 'code4', asString: 'Cust4 str'}
					]
				}
			}
		};

		$scope.mySelections = [];
		$scope.gridSelected = {
			reqMainPage: {
				searchCustomer: {
					customerGrid: []
				}
			}
		};

		$scope.gridOptions = {
			reqMainPage: {
				searchCustomer: {
					customerGrid: {
						data: 'data.reqMainPage.searchCustomer.customerGrid',
						selectedItems : $scope.gridSelected.reqMainPage.searchCustomer.customerGrid,
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
						columnDefs: [
							{field: 'name', displayName: $translate.instant('name')},
							{field: 'code', displayName: $translate.instant('code')},
							{field: 'address.asString', displayName: $translate.instant('address')}
						]
					}
				}
			}
		}

		$scope.$watchCollection('gridSelected.reqMainPage.searchCustomer.customerGrid', function() {
			$scope.data.reqMainPage.criteria.customers = $scope.gridSelected.reqMainPage.searchCustomer.customerGrid;
		});


		$scope.actions = {
			reqMainPage: {
				criteria: {
					customers: {
						open: {
							onClick: function () {
								CommonsService.actions.openModal('reqMainPage.searchCustomer');
							}
						}
					}
				},
				searchCustomer: {
					footerActions: {
						ok: {
							onClick: function () {
								CommonsService.actions.closeModal('reqMainPage.searchCustomer');
							}
						},
						cancel: {
							onClick: function () {
								CommonsService.actions.closeModal('reqMainPage.searchCustomer');
							}
						}
					}
				}
			}
		};


	}]);

