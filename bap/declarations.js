// display
var label = {displayType: 'label'};
var textInput = {displayType: 'textInput'};
var checkBox = {displayType: 'checkBox'};
var datePicker = {displayType: 'datePicker'};
var textArea = {displayType: 'textArea'};
var filterEntityDisplay = {displayType: 'filterEntityDisplay'};
var filterDateRangeDisplay = {displayType: 'filterDateRangeDisplay'};

// variables
var string = {variableType: 'string', display: textInput};
var date = {variableType: 'date', display: datePicker};
var boolean = {variableType: 'boolean', display: checkBox};
var number = {variableType: 'number', display: textInput};
var object = {variableType: 'object'};
var filterEntity = {
    variableType: 'object',
    display: 'filterEntityDisplay',
    'ids': string,
    'names': string
};
var filterDateRange = {
    variableType: 'object',
    display: 'filterDateRangeDisplay',
    'startDate': date,
    'endDate': date
};

// views
var form = {viewType: 'form'};
var grid = {
    viewType: 'grid',
    input: {
        'multiSelect': {type: boolean, default: true}
    },
    methods: {
        getSelectedIds: {
            output: {
                'ids': string
            }
        },
        getSelectedValues: {
            input: {
                'fieldName': string
            },
            output: {
                'ids': string
            }
        }
    }
};

// actions
var openModal = {
    actionType: 'openModal',
    input: {
        'viewId': {type: string, mandatory: true},
        'viewParameters': object
    }
};
var refreshGrid = {
    actionType: 'refreshGrid',
    input: {
        'gridId': {type: string, mandatory: true}
    }
};
var back = {
    actionType: 'back'
};
var customAction = {
    actionType: 'customAction'
};




