view = {
		'requestMainFilter': {
			type: 'form',
			model: {
				'creationDate': {
					type: 'filterDateRange'
				},
				'customers': {
					type: 'filterEntity',
					action: {
						open: {view: 'customerFilter'},
						output: {
							'customers.ids': 'ids',
							'customers.names': 'names'
						}
						
					}  
				}
			}
		},
		'customerFilter':{
			type: 'form',
			{
				type: 'form',
				
			}
		},
		'requestMain':{
			model: 'Request',
		}

		
		
};