

var Country = {
    $nameSpace: 'sendy.sampleApp',
    $name: 'Country',
    id: num,
    name: str,
    iso2: str
};

var State =  {
    id: num,
    name: str,
    country: Country
};

var City = {
    id: num,
    name: str,
    code: str,
    state: State,
    country: Country
};

var Address = {
    id: num,
    name: str,
    city: City,
    state: State,
    asString: {
        $type: str,
        $computed: true
    }
};

var Customer = {
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
    id: num,
    code: str,
    description: str
};

var Request = {
    id: num,
    code: str,
    description: str,
    deliveryAddress: Address,
    customer: Customer,
    services: {
        $type: list,
        $itemType: Service
    }
};
