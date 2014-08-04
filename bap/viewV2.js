'use strict';

var fs = require('fs');
var vm = require('vm');
function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}
function writeFile(filename, content) {
    fs.writeFile(filename, content, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

}
include('declarationsV2.js');
include('modelV2.js');

var requestsByCriteriaWs = {
    $type: webService,
    $url: 'res/requests/byCriteria',
    $input: {
        name: str,
        code: str,
        deliveryAddressCity: str,
        customers: {
            $type: list,
            $itemType: Customer
        },
        startDate: date,
        endDate: date
    },
    $output: Request
};

var customersByCriteriaWs = {
    $type: webService,
    $url: 'res/customers/byCriteria',
    $input: {
        code: str,
        name: str,
        city: str
    },
    $output: {
        customers: {
            $type: list,
            $itemType: Customer
        }
    }
};


var saveRequestWs = {
    $type: webService,
    $url: 'res/requests.save',
    $input: Request,
    $output: {
        saveOk: bool
    }
};

var customerSearchModel = {
    criteria: customersByCriteriaWs.$input,
    grid: customersByCriteriaWs.$output,
    meta: {
        selectedRecords: {
            $type: list,
            $itemType: Customer
        }
    }
};

var createCustomerSearchForm = function (modelName, formName, targetSelectedCustomersModelName) {
    return {
        $type: modal,
        criteria: {
            $type: form,
            $model: modelName,
            $fields: [
                'criteria.code', 'criteria.name', 'criteria.city'
            ]
        },
        refresh: {
            $type: action,
            $action: refreshGrid,
            $target: formName + '.customerGrid'
        },
        customerGrid: {
            $type: grid,
            $model: modelName,
            $multiSelect: true,
            $selectedRecordModel: modelName + '.meta.selectedRecords',
            $dataSource: {
                $source: customersByCriteriaWs,
                $input: modelName + '.criteria',
                $output: modelName + '.grid'
            },
            $fields: [
                'grid.customers.name', 'grid.customers.code', 'grid.customers.address.asString',
                {$name: 'grid.customers.name', $hidden: true}
            ]
        },
        cancel: {
            $type: action,
            $action: closeModal
        },
        ok: {
            $type: action,
            $action: closeModal,
            $bind: [
                {
                    $type: binding,
                    $source: modelName + '.meta.selectedRecords',
                    $target: targetSelectedCustomersModelName
                }
            ]
        }
    };
};


var reqMainPage = {
    $type: page,
    $location: 'requests', // Disk location
    $url: 'requests/mainPage', // Angular routing location
    $model: {
        criteriaModel: requestsByCriteriaWs.$input,
        gridModel: requestsByCriteriaWs.$output,
        customerSearchModel: customerSearchModel,
        selectedCustomer: Customer,
        saveStatus: {
            saveOk: bool
        }
    },
    criteria: {
        $type: form,
        $model: 'criteriaModel',
        $fields: {
            $list: [
                'name', 'code', 'deliveryAddressCity', 'startDate', 'endDate', 'customers'
            ]
        },
        open: {
            $type: action,
            $action: openModal,
            $target: 'customerSearch'
        }
    },
    refresh: {
        $type: action,
        $action: refreshGrid,
        $target: 'reqGrid'
    },
    reqGrid: {
        $display: grid,
        $model: 'gridModel',
        $selectedRecordModel: 'selectedCustomer',
        $multiSelect: false,
        $dataSource: {
            $source: requestsByCriteriaWs,
            $input: 'criteriaModel.criteria',
            $output: 'gridModel'
        },
        $fields: {
            $list: [
                'requests.code', 'requests.description', 'requests.deliveryAddress.asString', 'requests.customer',
                {$name: 'requests.id', $hidden: true}
            ]
        }
    },
    customerSearch: createCustomerSearchForm('customerSearchModel', 'customerSearch', 'criteriaModel.customers'),
    customerDetails: {
        $type: form,
        $model: 'selectedCustomer',
        save: {
            $type: action,
            $action: callWs,
            $ws: saveRequestWs,
            $input: 'selectedCustomer',
            $output: 'saveStatus'

        },
        fields: [
            'name', 'code', 'address.asString'
        ]
    }
};


writeFile('output.json', JSON.stringify(reqMainPage, null, 4));
//console.log(JSON.stringify(Country, null, 2));
//console.log(x('liviu'));