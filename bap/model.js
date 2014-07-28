var model = {
		Request:{
			id:{
				type:'id'
			},
			creationDate: {
				type:'date',
				readOnly:true
			},
			tariffs: {
				isArray: true,
				type: 'Tariff',
				mappedBy: 'request',
			},
			customer: {
				type: 'Customer'
			}
		},
		Tariff: {
			id: {
				type: 'id'
			},
			request: {
				type: 'Request'
			}
		},
		Customer: {
			id: {
				type: 'id'
			},
		}
};

