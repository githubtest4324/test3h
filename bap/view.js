// Data types
string = {dataType: 'string'};
filterEntity ={dataType: 'filterEntity'};

//Action types
openModal = {actionType: 'openModal'};
refreshGrid = {actionType: 'refreshGrid'}
// View types
form = {viewType: 'form'};
grid = {viewType: 'grid'};



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