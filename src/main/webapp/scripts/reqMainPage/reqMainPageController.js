'use strict';

test3hipsterApp.controller('reqMainPageController', ['$scope', 'ReqMainPageService', '$translate', 'CommonsService', '$http', 'WebServices',
	function ($scope, ReqMainPageService, $translate, CommonsService, $http, WebServices) {

		$scope.aaa = null;

		$scope.postData = function () {
			WebServices.ecom.requests.RequestsByCriteriaWs($scope, {"code": "req2"}, 'aaa');
		}

		$scope.data = {
			reqMainPage: {
				criteria: {
					customers: null
				},
				reqGrid: {
					data: [],
					selected: []
				},
				searchCustomer: {
					criteria: null,
					customerGrid: {
						data: [
							{id: 1, address: {id: 1, name: 'addr1', city: null, state: null, asString: 'addr1As'}, name: 'Customer1', asString: 'Cust1 str'},
							{id: 2, address: null, name: 'Customer2', asString: 'Cust2 str'},
							{id: 3, address: null, name: 'Customer3', asString: 'Cust3 str'},
							{id: 4, address: null, name: 'Customer4', asString: 'Cust4 str'}
						],
						selected: []
					}
				}
			}
		};

		$scope.gridOptions = {
			reqMainPage: {
				reqGrid: {
					data: 'data.reqMainPage.reqGrid.data',
					selectedItems: $scope.data.reqMainPage.reqGrid.selected,
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
						{field: 'code', displayName: $translate.instant('code')},
						{field: 'description', displayName: $translate.instant('description')},
						{field: 'deliveryAddress.asString', displayName: $translate.instant('address')},
						{field: 'customer.asString', displayName: $translate.instant('customer')}
					]
				},
				searchCustomer: {
					customerGrid: {
						data: 'data.reqMainPage.searchCustomer.customerGrid.data',
						selectedItems: $scope.data.reqMainPage.searchCustomer.customerGrid.selected,
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
				gridActions: {
					refresh: {
						onClick: function(){
								WebServices.ecom.requests.RequestsByCriteriaWs($scope, $scope.data.reqMainPage.criteria, 'data.reqMainPage.reqGrid.data');
						}
					}
				},
				searchCustomer: {
					footerActions: {
						ok: {
							onClick: function () {
								CommonsService.actions.bind($scope,
									'data.reqMainPage.searchCustomer.customerGrid.selected',
									'data.reqMainPage.criteria.customers');
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

