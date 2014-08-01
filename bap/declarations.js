var x1 = {
    x2: "aaa",
    x3: "bbb",
    x4: 'ccc'
};

var y1 = {
    x2: "aaa",
    x3: "bbb",
    x4: 'ccc'
};

// display
var noDisplay = {displayType: 'noDisplay'};
var label = {displayType: 'label'};
var textInput = {displayType: 'textInput'};
var checkBox = {displayType: 'checkBox'};
var datePicker = {displayType: 'datePicker'};
var textArea = {displayType: 'textArea'};
var filterEntityDisplay = {displayType: 'filterEntityDisplay'};
var filterDateRangeDisplay = {displayType: 'filterDateRangeDisplay'};

// variables
var id = {variableType: 'stringType', display: noDisplay};
var str = {variableType: 'stringType', display: textInput};
var date = {variableType: 'dateType', display: datePicker};
var bool = {variableType: 'booleanType', display: checkBox};
var number = {variableType: 'numberType', display: textInput};
var obj = {variableType: 'objectType'};
var filterEntity = {
    variableType: 'objectType',
    display: 'filterEntityDisplay',
    'ids': str,
    'names': str
};
var filterDateRange = {
    variableType: 'obj',
    display: 'filterDateRangeDisplay',
    'startDate': date,
    'endDate': date
};

// views
var page = {viewType: 'pageView'};
var form = {viewType: 'formView'};
var grid = {
    viewType: 'gridView',
    input: {
        'multiSelect': {type: bool, defaultValue: true}
    },
    methods: {
        getSelectedIds: {
            output: {
                'ids': str
            }
        },
        getSelectedValues: {
            input: {
                'fieldName': str
            },
            output: {
                'ids': str
            }
        }
    }
};

// actions
var openModal = {
    actionType: 'openModalAction',
    input: {
        'viewId': {type: str, mandatory: true},
        'viewParameters': obj
    }
};
var refreshGrid = {
    actionType: 'refreshGridAction',
    input: {
        'gridId': {type: str, mandatory: true}
    }
};
var back = {
    actionType: 'backAction'
};
var customAction = {
    actionType: 'customAction'
};




