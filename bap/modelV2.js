

var Country = {
    $nameSpace: 'sendy.sampleApp',
    $name: 'Country',
	$type: obj,
    id: num,
    name: str,
    iso2: str
};

var State =  {
	$type: obj,
    id: num,
    name: str,
    country: {
		$type: Country,
		$relationship: manyToOne,
		$i18n: 'country'
	}
};

var City = {
    id: num,
    name: str,
    code: str,
    state: {
		$type: State,
		$relationship: manyToOne
	},
    country: {
		$type: Country,
		$relationship: manyToOne
	}
};

var Address = {
	$type: obj,
    id: num,
    name: str,
    city: City,
    state: State,
    asString: {
        $type: str,
        $computed: true,
		$i18n: 'address'
    }
};

var Customer = {
	$type: obj,
    id: num,
    name: str,
    code: str,
    address: Address,
    asString: {
        $type: str,
        $computed: true
    }
};

var Service = {
	$type: obj,
    id: num,
    code: str,
    description: str,
	request: {
		$type: Request,
		$relationship: manyToOne
	}
};

var Request = {
    $type: obj,
	id: num,
    code: {
		$type: str,
		$i18n: 'code'
	},
    description: str,
    deliveryAddress: Address,
    customer: Customer,
    services: {
		$type: Service,
		$list: true,
		$relationship: oneToMany,
		$mappedBy: 'request'
	}
};
