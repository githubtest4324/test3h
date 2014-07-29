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
        'creationDate': 'filterDateRange',
        'customers': {
            type: filterEntity,
            readOnly: true,
            actions: {
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
        }
    },
    'customerFilter': {
        type: form,
        input: {
            'multiSelect': {
                type: boolean,
                default: true,
                bind: 'customerGrid.multiSelect'
            }
        },
        output: {
            'ids': string,
            'names': string
        },
        actions: {
            'search': {
                type: refreshGrid,
                before: {
                    bind: {gridId: 'customerGrid'}
                }
            },
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
        'criteria': {
            type: form,
            'name': string
        },
        'customerGrid': {
            type: grid,
            'name': string
        }

    },
    'requestMain': {
        model: 'Request'
    }



};

console.log(JSON.stringify(view, undefined, 2));