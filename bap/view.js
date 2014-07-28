view = {
		requestsMainFilter: {
			type: 'form',
			model: {
				creationDate: {
					type: 'filterDateRange'
				},
				customer: {
					type: 'Customer',
					reference: 
				}
			}
		},

		requestsMain:{
			model: 'Request',
		}

		
		
};