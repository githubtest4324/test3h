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
    $inputModel: {
        name: str,
        code: str,
        deliveryAddressCity: str,
        selectedRecords: {
            $type: list,
            $itemType: Customer
        },
        startDate: date,
        endDate: date
    },
    $outputModel: {
        requests: {
            $type: list,
            $itemType: Request
        }
    }
};

var customersByCriteriaWs = {
    $type: webService,
    $url: 'res/customers/byCriteria',
    $inputModel: {
        code: str,
        name: str,
        city: str
    },
    $outputModel: {
        customers: {
            $type: list,
            $itemType: Customer
        }
    }
};


var customerSearchModel = {
    criteria: customersByCriteriaWs.$inputModel,
    grid: customersByCriteriaWs.$outputModel,
    meta: {
        selectedRecords: {
            $type: list,
            $itemType: Customer
        }
    }
};

var createCustomerSearchForm = function (formName, modelName, targetSelectedCustomersModelName) {
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
            $target: formName + 'customerGrid'
        },
        customerGrid: {
            $type: grid,
            $model: modelName,
            $selectedRecordModel: modelName + 'meta.selectedRecords',
            $dataSource: {
                $source: customersByCriteriaWs,
                $input: modelName + 'criteria',
                $output: modelName + 'grid'
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
                    $source: modelName + 'meta.selectedRecords',
                    $target: targetSelectedCustomersModelName
                }
            ]
        }
    };
}


var reqMainPage = {
    $type: page,
    $location: 'requests', // Disk location
    $url: 'requests/mainPage', // Angular routing location
    $model: {
        criteriaModel: {
            criteria: requestsByCriteriaWs.$inputModel,
            meta: {
                customerNames: str
            }
        },
        gridModel: requestsByCriteriaWs.$outputModel,
        customerSearch: customerSearchModel
    },
    criteria: {
        $type: form,
        $model: 'criteriaModel',
        $fields: {
            $list: [
                'criteria.name', 'criteria.code', 'criteria.deliveryAddressCity', 'criteria.startDate', 'criteria.endDate', 'meta.customerNames'
            ]
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
    customerSearch: createCustomerSearchForm('customerSearchModel', 'customerSearch', 'criteriaModel.criteria.selectedRecords')
};

writeFile('output.json', JSON.stringify(reqMainPage, null, 4));
//console.log(JSON.stringify(reqMainPage, null, 2));
//console.log(JSON.stringify(Country, null, 2));
//console.log(x('liviu'));