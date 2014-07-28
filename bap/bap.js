var model = {
		Request:{
			id:{
				type:'long'
			},
			creationDate: {
				type:'date',
				readOnly:true
			},
			tariffs: {
				isArray: true,
				type: 'Tariff',
				mappedBy: 'request',
				readOnly: true
			}
		},
		Tariff: {
			id: {
				type: 'long'
			},
			request: {
				type: 'Request'
			}
		}
};