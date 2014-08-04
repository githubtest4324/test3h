'use strict';

var fs = require('fs');
var vm = require('vm');
function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}

include('declarationsV2.js');
include('modelV2.js');

var getRequestsByCriteria = {
    $type: webService,
    $url: 'res/customers/byCriteria',
    $inputModel: {
        name: str,
        code: str,
        deliveryAddressCity: str,
        customerIds: str,
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


var reqMainPage = {
    $type: page,
    $location: 'requests', // Disk location
    $model: {
        criteriaModel: {
            criteria: getRequestsByCriteria.$inputModel,
            meta: {
                customerNames: str
            }
        },
        gridModel: getRequestsByCriteria.$outputModel
    },
    criteria: {
        $type: form,
        $model: 'criteriaModel',
        $fields: {
            $list: [
                'criteria.name', 'criteria.code', 'criteria.deliveryAddressCity', 'criteria.startDate', 'criteria.endDate', 'meta.customerNames'
            ]
        },
        'meta.customerNames': {$type: modelRef, $display: text}
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
            $source: getRequestsByCriteria,
            $input: 'criteriaModel.criteria',
            $output: 'gridModel'
        },
        $fields: {
            $list: [
                'requests.code', 'requests.description', 'requests.deliveryAddress.asString', 'requests.customer',
                {$name: 'requests.id', $hidden: true}
            ]
        }
    }
};


console.log(JSON.stringify(reqMainPage, null, 2));
//console.log(JSON.stringify(Country, null, 2));
//console.log(reqMainPage.gridModel.requests.$itemType.xxx.toString());