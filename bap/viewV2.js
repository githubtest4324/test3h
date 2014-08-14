'use strict';

var fs = require('fs');
var vm = require('vm');
function include(path) {
	var code = fs.readFileSync(path, 'utf-8');
	vm.runInThisContext(code, path);
}
function writeFile(filename, content) {
	fs.writeFile(filename, content, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("The file was saved!");
		}
	});

}
include('declarationsV2.js');
include('modelV2.js');

var requestsByCriteriaWs = {
	$type: webService,
	$url: 'res/requests/byCriteria',
	$input: {
		name: str,
		code: str,
		deliveryAddressCity: str,
		customers: {
			$type: list,
			$itemType: Customer
		},
		startDate: date,
		endDate: date
	},
	$output: {
		$type: list,
		$itemType: Request
	}
};

var customersByCriteriaWs = {
	$type: webService,
	$url: 'res/customers/byCriteria',
	$input: {
		code: str,
		name: str,
		city: str
	},
	$output: {
		$type: list,
		$itemType: Customer
	}
};


var saveRequestWs = {
	$type: webService,
	$url: 'res/requests.save',
	$input: Request,
	$output: bool

};

/**
 * Common dialog for selecting multiple customers.
 * Output:
 * selectedCustomers - will receive the customer selected by user
 */
var createCustomerSearchForm = {
	$id: 'createCustomerSearchForm',
	$type: modal,
	$template: {
		$name: 'container_template',
		cols: 1
	},
	$view: [
		{
			$id: 'criteria',
			$type: form,
			$model: customersByCriteriaWs.$input,
			$fields: [
				'criteria.code', 'criteria.name', 'criteria.city'
			]
		},
		{
			$type: buttonGroup,
			$fields: [
				{
					$action: refreshGrid,
					$target: 'customerGrid'
				}
			]
		},
		{
			$id: 'customerGrid',
			$type: grid,
			$model: {
				data: customersByCriteriaWs.$output,
				selected: {
					$type: list,
					$itemType: Customer
				}
			},
			$dataRef: 'data',
			$selectedRef: 'selected',
			$multiSelect: true,
			$dataSource: {
				$source: customersByCriteriaWs,
				$input: 'criteria',
				$output: 'data'
			},
			$fields: [
				'data.name', 'data.code', 'data.address.asString',
				{$ref: 'data.id', $hidden: true}
			]
		},
		{
			$type: buttonGroup,
			$fields: [
				{
					$type: button,
					$onClick: {
						$action: closeModal
					}
				},
				{
					$type: button,
					$onClick: [
						{
							$action: bind,
							$source: 'customerGrid.selected',
							$destination: 'selectedCustomers' // Output
						},
						{
							$action: closeModal
						}
					]
				}

			]
		}
	]
};


var reqMainPage = {
	$type: page,
	$location: 'requests', // Disk location
	$url: 'requests/mainPage', // Angular routing location
	$pageId: 'reqMainPage',
	$model: {
		selectedCustomers: Customer
	},
	$template: {
		$name: 'container_template',
		cols: 1
	},
	$view: [
		{
			$id: 'criteria',
			$type: form,
			$title: 'Search requests',
			$model: requestsByCriteriaWs.$input,
			$bind: { // todo
				$source: 'selectedCustomers',
				$target: 'criteria.customers'
			},
			$template: {
				$name: 'container_template',
				cols: 2
			},
			$fields: [
				['name', 'code'],
				['endDate', 'startDate'],
				['deliveryAddressCity',
					['customers', {
						$type: button,
						$class: 'fa fa-search',
						$onClick: {
							$action: openModal,
							$target: 'customerSearch'
						}
					}]
				]
			]
		},
		{
			$id: 'gridActions',
			$type: buttonGroup,
			$collapse: false,
			$buttons: [
				{
					$id: 'refresh',
					$type: button,
					$class: 'fa fa-search',
					$onClick: {
						$action: refreshGrid,
						$target: 'reqGrid'
					}
				}
			]
		},
		{
			$id: 'reqGrid',
			$type: grid,
			$model: {
				data: requestsByCriteriaWs.$output,
				selected: Request},
			$dataRef: 'data',
			$selectedRef: 'selected',
			$multiSelect: false,
			$dataSource: {
				$source: requestsByCriteriaWs,
				$input: 'criteria',
				$output: 'data'
			},
			$fields: [
				'data.code', 'data.description', 'data.deliveryAddress.asString', 'data.customer',
				{$ref: 'data.id', $hidden: true}

			],
			$onItemClick: {
				$action: bind,
				$source: 'reqGrid.selected',
				$target: 'requestDetails.request'
			}
		},
		{
			$id: 'requestDetails',
			$type: form,
			$model: {
				request: Request,
				saved: bool
			},
			$view: [
				{
					$type: buttonGroup,
					$fields: [
						{
							$type: button,
							$onClick: {
								$action: callWs,
								$ws: saveRequestWs,
								$input: 'request',
								$output: 'saved'
							}
						}
					]
				},
				{
					$type: container,
					$fields: [
						'request.name', 'request.code', 'request.deliveryAddress.asString'
					]
				}
			]
		},
		createCustomerSearchForm
	]
};

var toType = function (obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
};

//writeFile('output.json', JSON.stringify(reqMainPage, null, 4));
console.log(toType(reqMainPage.$view));
console.log(reqMainPage.$view.length);
//console.log(JSON.stringify(Country, null, 2));
//console.log(x('liviu'));