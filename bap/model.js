var model = {
		Request:{
			id:'id',
			creationDate: {
				type:'date',
				readOnly:true
			},
			tariffs: 'Tariff[]',
			customer: 'Customer',
			code: 'string'
		},
		Tariff: {
			id: 'id',
			request: 'Request'
		},
		Customer: {
			id:'id'
		}
};

