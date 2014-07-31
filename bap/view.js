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
            'code': string,
            'customers': {
                type: filterEntity,
                readOnly: true,
                'openCustomerFilter': {
                    type: openModal,
                    before: {
                        bind: {
                            'input.viewId': 'customerFilter',
                            'input.viewParameters': {
                                'multiSelect': false
                            }
                        }
                    },
                    after: {
                        bind: {
                            'output.customers.ids': 'ids',
                            'output.customers.names': 'names'
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
            'code': string,
            'creationDate': date,
            'expectedDeliveryDate': date,
            'customer': string
        }

    },
    'customerFilter': {
        type: form,
        input: {
            'multiSelect': {
                type: bool,
                defaultValue: false,
                bind: 'customerGrid.multiSelect'
            }
        },
        output: {
            'ids': string,
            'names': string
        },
        // Criteria
        'criteria': {
            type: form,
            'name': string
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
            'name': string
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
        't1': string,
        'criteria': {
            type: form,
            'creationDate': filterDateRange
        }

    }


};

console.log(JSON.stringify(view, null, 2));

