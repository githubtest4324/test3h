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
		
		// Grid options
		options: {
			selectable: {type: bool, defaultValue: true},
			multiSelection: {type: bool, defaultValue: true},
            columnResize: {type: bool, defaultValue: true},
            columnReorder: {type: bool, defaultValue: true},
            sortable: {type: bool, defaultValue: true},
            headerRowHeight: {type: num, defaultValue: 35},
            rowHeight: {type: num, defaultValue: 35},
		},

		// idsOut getSelectedIds() - Returns comma separated list of selected ids
		selectedIds: {
			type: func,
			functionType: 'gridSelectedIds',
			'idsOut': str
		},
		
		// valuesOut getSelectedValues(fieldName) - Returns comma separated list of selected values for 'fieldName'
		selectedValues: {
			type: func,
			functionType: 'gridSelectedValues',
			'fieldName': str,
			'valuesOut': str,
		}
};

//Actions
var openModal = {
		actionType: 'openModalAction',
		'view': {type: form, mandatory: true},
		'viewParameters': any,
		'viewOutput': any
};
var refreshGrid = {
		actionType: 'refreshGridAction',
		'gridView': {type: form, mandatory: true}
};
var back = {
		actionType: 'backAction'
};
var customAction = {
		actionType: 'customAction'
};




