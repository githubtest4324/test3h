var fs = require('fs');
var vm = require('vm');
function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}

include('declarations.js');


view = {
    'requestMainFilter': {
        type: form,
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
                type: boolean,
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
    'requestMain': {
        model: 'Request'
    }



};

console.log(JSON.stringify(view, null, 2));