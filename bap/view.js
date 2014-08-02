'use strict';

var fs = require('fs');
var vm = require('vm');
function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}

include('declarations.js');


var view = {
    'requestMainFilter': {
        type: page,
        // Criteria
        'criteria': {
            type: form,
            'creationDate': 'filterDateRange',
            'code': text,
            'customer': {
                type: filterEntity,
                readOnly: true,
                'openCustomerFilter': {
                    type: openModal,
                    before: {
                        bind: {
                            '$view': '$customerFilter',
                            '$customerFilter.grid.options.multiSelect': false
                        }
                    },
                    after: {
                        bind: {
                            '$customer.ids': '$customerFilter.idsOut',
                            '$customer.names': '$customerFilter.namesOut'
                        }
                    }
                }
            }
        },
        // Search action
        'search':{
            type: refreshGrid,
            before: {
                bind: {
                    '$gridView': '$requestGrid'
                }
            }
        },
        // Grid
        'requestGrid':{
            type: grid,
            'id': id,
            'code': str,
            'creationDate': date,
            'expectedDeliveryDate': date,
            'customer': str
        }

    },
    'customerFilter': {
        type: form,
        // Output parameters
        'idsOut': str,
        'namesOut': str,
        // Criteria
        'criteria': {
            type: form,
            'name': str
        },
        // Search Action
        'search': {
            type: refreshGrid,
            before: {
                bind: {'$gridView': '$grid'}
            }
        },
        // Grid
        'grid': {
            type: grid,
            'name': str,
            'code': str
        },
        // Ok/Cancel Actions
        'ok': {
            type: customAction,
            before: {
                bind: {
                    '$idsOut': 'grid.selectedIds()',
                    '$customerGrid.selectedValues.fieldName': 'name',
                    '$namesOut': '$grid.selectedValues()'
                },
                after: {
                    'goBack': back
                }
            }
        },
        'cancel': back

    },
    'testModule': {
        type: form,
        't1': str,
        'criteria': {
            type: form,
            'creationDate': filterDateRange
        }

    }


};

console.log(JSON.stringify(view, null, 2));

