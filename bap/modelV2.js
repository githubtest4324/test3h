var Country = 'Country';
var State = 'State';
var City = 'City';
var Address = 'Address';
var Request = 'Request';
var Customer = 'Customer';
var Service = 'Service';

var model = {
	'ecom': {
		type: namespace,
		properties: {
			model: {
				type: namespace,
				properties: {
					'regional': {
						type: namespace,
						properties: {
							Country: {
								type: entity,
								properties: {
									id: num,
									name: str,
									iso2: str
								}
							},
							State: {
								type: entity,
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
							City: {
								type: entity,
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
							Address: {
								type: entity,
								properties: {
									id: num,
									name: str,
									city: City,
									state: State,
									asString: {
										type: str,
										computed: true,
										i18n: 'address'
									}
								}
							}
						}
					}
				},
				Customer: {
					type: entity,
					id: num,
					name: str,
					code: str,
					address: Address,
					asString: {
						type: str,
						transientDb: true,
						i18n: 'customer'
					}
				},
				Service: {
					type: entity,
					properties: {
						id: num,
						code: str,
						description: str,
						request: {
							type: Request,
							relationship: manyToOne
						}
					}
				},
				Request: {
					type: entity,
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
							relationship: oneToMany,
							mappedBy: 'request'
						}
					}
				}
			}
		}
	}
};
