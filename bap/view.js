string = {value : 'string', display: 'string'};
filterEntity ={ids: 'string', names: 'string', display: 'filterDateRange'};

view = {
		'requestMainFilter': {
			type: 'form',
			'creationDate': 'filterDateRange',
			'customers': {
				type: filterEntity,
				readOnly: true,
				action: {
					'openCustomerFilter': {
						type: 'openModal',
						view: 'customerFilter',
						inputBinding: {
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
			type: 'form',
			input: {
				'multiSelect': true
			},
			'criteria':{
				type: 'form',
				'name': 'string'
			},
			action:{
				"search":{
					type: 'refreshGrid',
					gridId: 'customerResult'
				}
			},
			'customerResult':{
				type:'grid',
				'name': string
			}

		},
		'requestMain':{
			model: 'Request',
		}



};