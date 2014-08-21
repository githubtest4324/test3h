'use strict';

test3hipsterApp.controller('reqMainPageController', ['$scope', 'ReqMainPageService', '$translate', 'CommonsService', '$http', 'WebServices',
	function ($scope, ReqMainPageService, $translate, CommonsService, $http, WebServices) {

		$scope.aaa = null;

		$scope.postData = function () {
			WebServices.ecom.requests.CustomersByCriteriaWs($scope, {}, 'aaa');
		}

		$scope.data = {
			reqMainPage: {
				criteria: {
					customers: null
				},
				reqGrid: {
					data: [],
					selected: null
				},
				searchCustomer: {
					criteria: null,
					customerGrid: {
						data: [],
						selected: null
					}
				},
				requestDetails:{
					request: null,
					saved: false
				}
			}
		};

		$scope.gridOptions = {
			reqMainPage: {
				reqGrid: {
					data: 'data.reqMainPage.reqGrid.data',
					selectedItems: [], // $scope.data.reqMainPage.reqGrid.selected
					multiSelect: false,
					enableRowSelection: true,
					selectWithCheckboxOnly: false,
					showSelectionCheckbox: false,
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
						selectedItems: [],
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
		};

		$scope.$watchCollection('gridOptions.reqMainPage.reqGrid.selectedItems', function(newVal){
			$scope.data.reqMainPage.reqGrid.selected = newVal[0];
		});
		$scope.$watchCollection('gridOptions.reqMainPage.searchCustomer.customerGrid.selectedItems', function(newVal){
			$scope.data.reqMainPage.searchCustomer.customerGrid.selected = newVal;
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
				gridActions: {
					refresh: {
						onClick: function(){
								WebServices.ecom.requests.RequestsByCriteriaWs($scope, $scope.data.reqMainPage.criteria, 'data.reqMainPage.reqGrid.data');
						}
					}
				},
				searchCustomer: {
					customerGridActions: {
						refreshGrid: {
							onClick: function(){
								WebServices.ecom.requests.CustomersByCriteriaWs($scope, $scope.data.reqMainPage.searchCustomer.criteria, 'data.reqMainPage.searchCustomer.customerGrid.data');
							}
						}
					},
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

