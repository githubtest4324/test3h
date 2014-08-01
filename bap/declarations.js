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

//Field types
var any = {fieldType: 'anyType'}; // Defalut type
var id = {fieldType: 'idType'};
var str = {fieldType: 'stringType'};
var date = {fieldType: 'dateType'}; // Contains both date and time
var bool = {fieldType: 'booleanType'};
var number = {fieldType: 'numberType'};
var func = {fieldType: 'functionType'};


//Simple views
var label = {type: str, displayType: 'label'};
var text = {type: str, displayType: 'text'};
var textArea = {type: str, displayType: 'textArea'};
var checkBox = {type: bool, displayType: 'checkBox'};
var datePicker = {type: date, displayType: 'datePicker'};
var timePicker = {type: date, displayType: 'timePicker'};
var dateTimePicker = {type: date, displayType: 'dateTimePicker'};

//Filter views
var filterEntity = {
		display: 'filterEntityDisplay',
		'ids': str,
		'names': str
};
var filterDateRange = {
		'startDate': {
			type: datePicker
		},
		'endDate': datePicker
};


//Container views
var page = {viewType: 'pageView'};
var form = {viewType: 'formView'};
var grid = {
		viewType: 'gridView',
		'multiSelect': {type: bool, defaultValue: true},
		getSelectedIds: {
			type: func,
			'idsOut': str
		},
		getSelectedValues: {
			type: func,
			'fieldName': str,
			'valuesOut': str
		}
};

//Actions
var openModal = {
		actionType: 'openModalAction',
		'viewId': {type: str, mandatory: true},
		'viewParameters': any,
		'viewOutput': any
};
var refreshGrid = {
		actionType: 'refreshGridAction',
		'gridId': {type: str, mandatory: true}
};
var back = {
		actionType: 'backAction'
};
var customAction = {
		actionType: 'customAction'
};




