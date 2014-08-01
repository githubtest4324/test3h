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
                            '$viewId': 'customerFilter',
                            '$customerFilter.multiSelect': false
                        }
                    },
                    after: {
                        bind: {
                            '$customers.ids': 'ids',
                            '$customers.names': 'names'
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
                    'gridId': 'requestGrid'
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
        // Input parameters
        'multiSelect': {
            type: bool,
            defaultValue: false,
            bind: 'customerGrid.multiSelect'
        },
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
                bind: {gridId: 'customerGrid'}
            }
        },
        // Grid
        'customerGrid': {
            type: grid,
            'name': str
        },
        // Ok/Cancel Actions
        'ok': {
            type: customAction,
            before: {
                bind: {
                    'output.ids': 'customerGrid.getSelectedIds()',
                    'output.names': 'customerGrid.getSelectedValues("name")'
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

