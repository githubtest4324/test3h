
var fs = require('fs');
var vm = require('vm');
function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}

include('declarations.js');

view = {
		'requestMainFilter': {
			type: form,
			'creationDate': 'filterDateRange',
			'customers': {
				type: filterEntity,
				readOnly: true,
				action: {
					'openCustomerFilter': {
						type: openModal,
						inputBinding: {
							'viewId': 'customerFilter',
							'multiSelect': false
						},
						outputBinding: {
							'customers.ids': 'ids',
							'customers.names': 'names'
						}

					}

				}  
			}
		},
		'customerFilter':{
			type: form,
			input: {
				'multiSelect': true
			},
			'criteria':{
				type: form,
				'name': 'string'
			},
			action:{
				"search":{
					type: refreshGrid,
					inputBinding: {gridId: 'customerResult'}
				}
			},
			'customerResult':{
				type:grid,
				'name': string
			}

		},
		'requestMain':{
			model: 'Request'
		}



};

console.log(view);