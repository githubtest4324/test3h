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


var RequestsByCriteriaWs = 'RequestsByCriteriaWs';
var RequestsByCriteriaWsInput = 'RequestsByCriteriaWsInput';
var CustomersByCriteriaWs = 'CustomersByCriteriaWs';
var CustomersByCriteriaWsInput = 'CustomersByCriteriaWsInput';
var SaveRequestWs = 'SaveRequestWs';

var webServices = {
	'sendy.myApp.webServices': [
		{
			name: RequestsByCriteriaWsInput,
			type: obj,
			properties: {
				name: str,
				code: str,
				deliveryAddressCity: str,
				customers: {
					type: list,
					itemType: Customer
				},
				startDate: date,
				endDate: date
			}
		},
		{
			name: RequestsByCriteriaWs,
			type: webService,
			url: 'res/requests/byCriteria',
			input: RequestsByCriteriaWsInput,
			output: {
				type: list,
				itemType: Request
			}
		},
		{
			name: CustomersByCriteriaWsInput,
			type: obj,
			properties: {
				code: str,
				name: str,
				city: str
			}
		},
		{
			name: CustomersByCriteriaWs,
			type: webService,
			url: 'res/customers/byCriteria',
			input: CustomersByCriteriaWsInput,
			output: {
				type: list,
				itemType: Customer
			}
		},
		{
			name: SaveRequestWs,
			type: webService,
			url: 'res/requests.save',
			input: Request,
			output: bool
		}
	]
};

var CustomerSearchForm = 'CustomerSearchForm';


var userInterface = {
	ReqMainPage: {
		type: page,
		location: 'requests', // Disk location
		url: 'requests/mainPage', // Angular routing location
		model: {
			selectedCustomers: Customer
		},
		$template: {
			name: 'container_template',
			properties: {
				cols: 1
			}
		},
		view: [
			{
				id: 'criteria',
				type: form,
				title: 'Search requests',
				model: RequestsByCriteriaWsInput,
				bind: { // todo
					source: 'selectedCustomers',
					target: 'criteria.customers'
				},
				template: {
					name: 'container_template',
					properties: {
						cols: 2
					}
				},
				fields: [
					['name', 'code'],
					['endDate', 'startDate'],
					['deliveryAddressCity',
						[
							{
								ref: 'customers.asString',
								display: text
							},
							{
								type: button,
								icon: 'fa fa-search',
								onClick: {
									action: openModal,
									target: 'customerSearchForm'
								}
							}
						]
					]
				]
			},
			{
				id: 'gridActions',
				type: buttonGroup,
				collapse: false,
				buttons: [
					{
						id: 'refresh',
						type: button,
						class: 'fa fa-search',
						onClick: {
							action: refreshGrid,
							target: 'reqGrid'
						}
					}
				]
			},
			{
				id: 'reqGrid',
				type: grid,
				multiSelect: false,
				data: {
					type: list,
					itemType: Request
				},
				selected: Request,
				dataSource: {
					source: RequestsByCriteriaWs,
					input: 'criteria',
					output: 'data'
				},
				fields: [
					'data.code', 'data.description', 'data.deliveryAddress.asString', 'data.customer',
					{ref: 'data.id', hidden: true}

				],
				onItemClick: {
					action: bind,
					source: 'reqGrid.selected',
					target: 'requestDetails.request'
				}
			},
			{
				id: 'requestDetails',
				type: form,
				model: {
					type: obj,
					properties: {
						request: Request,
						saved: bool
					}
				},
				view: [
					{
						type: buttonGroup,
						fields: [
							{
								type: button,
								onClick: {
									action: callWs,
									ws: SaveRequestWs,
									input: 'request',
									output: 'saved'
								}
							}
						]
					},
					{
						type: container,
						fields: [
							'request.name', 'request.code', 'request.deliveryAddress.asString'
						]
					}
				]
			},
			{
				type: ref,
				ref: CustomerSearchForm
			}

		]
	},
	/**
	 * Common dialog for selecting multiple customers.
	 * Output:
	 * selectedCustomers - will receive the customer selected by user
	 */
	CustomerSearchForm: {
		type: modal,
		title: 'Search customer',
		template: {
			name: 'container_template',
			properties: {
				cols: 1
			}
		},
		view: [
			{
				id: 'criteria',
				type: form,
				model: CustomersByCriteriaWsInput,
				fields: [
					'code', 'name', 'city'
				]
			},
			{
				type: buttonGroup,
				fields: [
					{
						type: button,
						icon: 'fa fa-search',
						action: refreshGrid,
						target: 'customerGrid' // todo
					}
				]
			},
			{
				id: 'customerGrid',
				type: grid,
				multiSelect: true,
				data: {
					type: list,
					itemType: Customer
				},
				selected: {
					type: list,
					itemType: Customer
				},
				dataSource: {
					source: CustomersByCriteriaWs,
					input: 'criteria',
					output: 'data'
				},
				$fields: [
					'data.name', 'data.code', 'data.address.asString',
					{ref: 'data.id', hidden: true}
				]
			},
			{
				type: buttonGroup,
				fields: [
					{
						type: button,
						onClick: {
							action: closeModal
						}
					},
					{
						type: button,
						onClick: [
							{
								action: bind,
								source: 'customerGrid.selected',
								destination: 'selectedCustomers' // Output
							},
							{
								action: closeModal
							}
						]
					}

				]
			}
		]
	}
}


function toType(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
};

var sendy = new Array();
function add(source, target) {
	target.push(source);
}
add(model, sendy);
add(webServices, sendy);
add(userInterface, sendy);


writeFile('output.json', JSON.stringify(sendy, null, 4));
//console.log(toType(reqMainPage.$view));
//console.log(reqMainPage.$view.length);
//console.log(JSON.stringify(Country, null, 2));
//console.log(x('liviu'));


