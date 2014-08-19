'use strict';

test3hipsterApp.controller('reqMainPageController', ['$scope', 'ReqMainPageService', '$translate',
	function ($scope, ReqMainPageService, $translate) {
		$scope.data = {
			customerSearchModel: {
				grid: {
					customers: [
						{id: 'id1', address: {id: 1, name: 'addr1', city: null, stati: null, asString: 'addr1As'}, name: 'Customer1', code: 'code1', asString: 'Cust1 str'},
						{id: 'id2', address: null, name: 'Customer2', code: 'code2', asString: 'Cust2 str'},
						{id: 'id3', address: null, name: 'Customer3', code: 'code3', asString: 'Cust3 str'},
						{id: 'id4', address: null, name: 'Customer4', code: 'code4', asString: 'Cust4 str'}
					]
				}
			},
			selectedCustomers: null,
			criteria: null,
			customerSearchForm: {
				criteria: null,
				customerGrid: {
					data: null,
					selected: null,
					gridOptions: {
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
						columnDefs: [
							{field: 'name', displayName: $translate.instant('name')},
							{field: 'code', displayName: $translate.instant('code')},
							{field: 'address.asString', displayName: $translate.instant('address')}
						]
					}
				}
			}
		};
		$scope.actions = {
			openModal: function (target) {
				var jqPath = '#'+target.replace('.', ' #');
				$(jqPath).modal();
			},
			closeModal: function (target) {
				var jqPath = '#'+target.replace('.', ' #');
				$(jqPath).modal('hide');
			},
			refreshGrid: function (target) {
				//todo: refresh grid's datasource
			},
			bind: function (source, destination) {
				var realSource = '$scope.' + source;
				var realDestination = '$scope' + destination;
				var expr = realSource + "=" + realDestination;
				eval(expr);
			},
			reqMainPage: {
				criteria: {
					customers: {
						open: {
							onClick: function(){
								$scope.actions.openModal('reqMainPage.searchCustomer');
							}
						}
					}
				},
				searchCustomer: {
					CustomerSearchForm: {
						footerActions: {
							ok: {
								onClick: function () {
									bind('reqMainPage.searchCustomer.customerGrid.selected', 'reqMainPage.selectedCustomers');
									closeModal('reqMainPage.searchCustomer');
								}
							}
						}
					}
				}
			}
		};


	}]);

