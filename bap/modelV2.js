

var Country = 'Country';
var State = 'State';
var City = 'City';
var Address = 'Address';
var Request = 'Request';
var Customer = 'Customer';
var Service = 'Service';

var model = {
	'sendy.sampleApp.model':{
		'regional':[
			{
				name: Country,
				type: obj,
				properties: {
					id: num,
					name: str,
					iso2: str
				}
			},
			{
				name: State,
				type: obj,
				properties: {
					id: num,
					name: str,
					country: {
						type: Country,
						relationship: manyToOne,
						i18n: 'country'
					}
				}
			},
			{
				name: City,
				type: obj,
				properties: {
					id: num,
					name: str,
					code: str,
					state: {
						type: State,
						relationship: manyToOne
					},
					country: {
						type: Country,
						relationship: manyToOne
					}
				}
			},
			{
				name: Address,
				type: obj,
				properties: {
					id: num,
					name: str,
					city: City,
					state: State,
					asString: {
						$type: str,
						$computed: true,
						$i18n: 'address'
					}
				}
			}
		],
		'': [
			{
				name: Customer,
				type: obj,
				id: num,
				name: str,
				code: str,
				address: Address,
				asString: {
					type: str,
					transientDb: true
				}

			},
			{
				name: Service,
				type: obj,
				properties: {
					id: num,
					code: str,
					description: str,
					request: {
						$type: Request,
						$relationship: manyToOne
					}
				}
			},
			{
				name: Request,
				type: obj,
				properties: {
					id: num,
					code: {
						type: str,
						i18n: 'code'
					},
					description: str,
					deliveryAddress: Address,
					customer: Customer,
					services: {
						type: list,
						itemType: Service,
						$relationship: oneToMany,
						$mappedBy: 'request'
					}
				}
			}
		]
	}


};
