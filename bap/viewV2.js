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
	'ecom': {
		type: namespace,
		properties: {
			webServices: {
				type: namespace,
				properties: {
					requests: {
						type: namespace,
						properties: {
							RequestsByCriteriaWsInput: {
								type: entity,
								properties: {
									description: str,
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
							RequestsByCriteriaWs: {
								type: webService,
								url: 'app/res/requests/byCriteria',
								input: RequestsByCriteriaWsInput,
								output: {
									type: list,
									itemType: Request
								}
							},
							SaveRequestWs: {
								type: webService,
								url: 'app/res/requests/save',
								input: Request,
								output: bool
							}
						}
					},
					customers: {
						CustomersByCriteriaWsInput: {
							type: entity,
							properties: {
								code: str,
								name: str,
								city: str
							}
						},
						CustomersByCriteriaWs: {
							name: CustomersByCriteriaWs,
							type: webService,
							url: 'app/res/customers/byCriteria',
							input: CustomersByCriteriaWsInput,
							output: {
								type: list,
								itemType: Customer
							}
						}
					}
				}
			}
		}
	}
};

var CustomerSearchForm = 'CustomerSearchForm';


var userInterface = {
	'reqMainPage': {
		type: page,
		location: 'requests', // Disk location
		url: 'requests/mainPage', // Angular routing location
		columns: 1,
		properties: {
			'criteria': {
				type: form,
				title: 'Search requests',
				model: RequestsByCriteriaWsInput,
				columns: 2,
				properties: {
					'description': {type: text},
					'code': {type: text},
					'endDate': {type: datePicker},
					'startDate': {type: datePicker},
					'deliveryAddressCity': {type: text},
					'customers': {
						type: container,
						properties: {
							'customers.asString': {type: text},
							'open': {
								type: button,
								icon: 'fa fa-search',
								onClick: {
									type: openModal,
									target: 'searchCustomer.CustomerSearchForm'
								}
							}
						}
					}
				}
			},
			'gridActions': {
				type: buttonGroup,
				collapse: false,
				properties: {
					'refresh': {
						type: button,
						class: 'fa fa-search',
						tooltip: 'refresh',
						onClick: {
							type: refreshGrid,
							target: 'reqGrid'
						}
					}
				}
			},
			'reqGrid': {
				type: grid,
				multiSelect: false,
				model: {
					type: obj,
					properties: {
						data: {
							type: list,
							itemType: Request
						},
						selected: {
							type: Request
						}
					}
				},
				data: 'reqGrid.data',
				selected: 'reqGrid.selected',
				dataSource: {
					source: RequestsByCriteriaWs,
					input: 'criteria',
					output: 'data'
				},
				properties: [
					'code', 'description', 'deliveryAddress.asString', 'customer.asString'
				],
				onItemClick: {
					type: bind,
					source: 'reqGrid.selected',
					target: 'requestDetails.request'
				}
			},
			'requestDetails': {
				type: container,
				model: {
					type: obj,
					properties: {
						saved: bool
					}
				},
				properties: {
					'actions': {
						type: buttonGroup,
						properties: {
							save: {
								type: button,
								icon: 'fa fa-save',
								tooltip: 'save',
								onClick: {
									type: callWs,
									ws: SaveRequestWs,
									input: 'reqGrid.selected',
									output: 'saved'
								}
							}
						}
					},
					'requestForm': {
						type: form,
						columns: 2,
						properties: {
							'reqGrid.selected.code': {type: text},
							'reqGrid.selected.description': {type: text},
							'reqGrid.selected.deliveryAddress.asString': {type: text, reqdOnly: true}
						}
					}
				}
			},
			'searchCustomer': {
				type: CustomerSearchForm,
				parameters: {
					selectedCustomersParam: 'reqMainPage.criteria.customers'
				}
			}
		}
	},
	/**
	 * Common dialog for selecting multiple customers.
	 * Input:
	 * selectedCustomersParams - will receive the customers selected by user
	 */
	'CustomerSearchForm': {
		type: modal,
		title: 'Search customer',
		columns: 1,
		inputParameters: ['selectedCustomersParam'],
		properties: {
			'criteria': {
				type: form,
				model: CustomersByCriteriaWsInput,
				properties: {
					'code': {type: text}, 'name': {type: text}, 'city': {type: text}
				}
			},
			'customerGridActions': {
				type: buttonGroup,
				properties: {
					refreshGrid: {
						type: button,
						icon: 'fa fa-search',
						onClick: {
							type: refreshGrid,
							target: 'customerGrid'
						}
					}
				}
			},
			'customerGrid': {
				type: grid,
				multiSelect: true,
				model: {
					type: obj,
					properties: {
						data: {
							type: list,
							itemType: Customer
						},
						selected: {
							type: list,
							itemType: Customer
						}
					}
				},
				data: 'customerGrid.data',
				selected: 'customerGrid.selected',
				dataSource: {
					source: CustomersByCriteriaWs,
					input: 'criteria',
					output: 'data'
				},
				fields: [
					'name', 'code', 'address.asString'
				]
			},
			'footerActions': {
				type: buttonGroup,
				properties: {
					'close': {
						type: button,
						onClick: {
							type: closeModal
						}
					},
					'ok': {
						type: button,
						onClick: [
							{
								type: bind,
								source: 'customerGrid.selected',
								destination: 'selectedCustomersParam' // Output
							},
							{
								type: closeModal,
								target: CustomerSearchForm
							}
						]
					}

				}
			}
		}
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


writeFile('output.json', JSON.stringify(model, null, 4));
//console.log(toType(reqMainPage.$view));
//console.log(reqMainPage.$view.length);
//console.log(JSON.stringify(Country, null, 2));
//console.log(x('liviu'));


