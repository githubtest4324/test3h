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
        fields: {
            // Criteria
            'criteria': {
                type: form,
                fields: {
                    'creationDate': filterDateRange,
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
                }
            },
            // Search action
            'search': {
                type: refreshGrid,
                before: {
                    bind: {
                        '$gridView': '$grid'
                    }
                }
            },
            // Grid
            'grid': {
                type: grid,
                fields: {
                    'id': none,
                    'code': text,
                    'creationDate': dateTimePicker,
                    'expectedDeliveryDate': datePicker,
                    'customer': entity,
                    'deliveryAddress': entity
                }
            }
        }
    },
    'customerFilter': {
        type: form,
        // Output parameters
        'idsOut': none,
        'namesOut': none,
        fields: {
            // Criteria
            'criteria': {
                type: form,
                fields: {
                    'name': text
                }
            },
            // Search Action
            'search': {
                type: refreshGrid,
                before: {
                    bind: {
                        '$gridView': '$grid'
                    }
                }
            },
            // Grid
            'grid': {
                type: grid,
                fields: {
                    'id': none,
                    'name': text,
                    'code': text
                }
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
                },
                after: {
                    'goBack': back
                }
            },
            'cancel': back
        }
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

var a1 = {
    'b1.city': {
        x1: 'liviu',
        y1: 'bob'
    }
};
var a2 = {
    b1: 'adi',
    c1: a1
};

console.log(JSON.stringify(a1['b1.city'], null, 2));
