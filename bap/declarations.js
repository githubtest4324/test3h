var x1 = {
	x2 : "aaa",
	x3 : "bbb",
	x4 : 'ccc'
};

var y1 = {
	x2 : "aaa",
	x3 : "bbb",
	x4 : 'ccc'
};

// Field types
// Default type
var any = {
	fieldType : 'anyType'
};
// Reference to any definition
var ref = {
	fieldType : 'referenceType',
};
var id = {
	fieldType : 'idType'
};
var str = {
	fieldType : 'stringType'
};
// Contains both date and time
var date = {
	fieldType : 'dateType'
};
var bool = {
	fieldType : 'booleanType'
};
var num = {
	fieldType : 'numberType'
};
var func = {
	fieldType : 'functionType'
};

// Form display types
var none = {
	type : str,
	displayType : 'label'
};
var label = {
	type : str,
	displayType : 'label'
};
var text = {
	type : str,
	displayType : 'text'
};
var textArea = {
	type : str,
	displayType : 'textArea'
};
var checkBox = {
	type : bool,
	displayType : 'checkBox'
};
var datePicker = {
	type : date,
	displayType : 'datePicker'
};
var timePicker = {
	type : date,
	displayType : 'timePicker'
};
var dateTimePicker = {
	type : date,
	displayType : 'dateTimePicker'
};

// Filter views
var filterEntity = {
	display : 'filterEntityDisplay',
	'ids' : str,
	'names' : str
};
var filterDateRange = {
	'startDate' : {
		type : datePicker
	},
	'endDate' : datePicker
};

// Container views
var page = {
	viewType : 'pageView',

	// Reference to model used as data source
	model : ref,

	// Defines list of fields to be shown from model. If model
	// is not defined, this is considered the model.
	fields : any,
};
var form = {
	viewType : 'formView',

	// Reference to model used as data source
	model : ref,

	// Defines list of fields to be shown from model. If model
	// is not defined, this is considered the model.
	fields : any,
};
var grid = {
	viewType : 'gridView',

	// Reference to model used as data source
	model : ref,

	// Defines list of fields to be shown from model. If model
	// is not defined, this is considered the model.
	fields : any,

	// Grid options
	options : {
		selectable : {
			type : bool,
			defaultValue : true
		},
		multiSelection : {
			type : bool,
			defaultValue : true
		},
		columnResize : {
			type : bool,
			defaultValue : true
		},
		columnReorder : {
			type : bool,
			defaultValue : true
		},
		sortable : {
			type : bool,
			defaultValue : true
		},
		headerRowHeight : {
			type : num,
			defaultValue : 35
		},
		rowHeight : {
			type : num,
			defaultValue : 35
		},
	},

	// idsOut getSelectedIds() - Returns comma separated list of selected ids
	selectedIds : {
		type : func,
		functionType : 'gridSelectedIds',
		'idsOut' : str
	},

	// valuesOut getSelectedValues(fieldName) - Returns comma separated list of
	// selected values for 'fieldName'
	selectedValues : {
		type : func,
		functionType : 'gridSelectedValues',
		'fieldName' : str,
		'valuesOut' : str,
	}
};

// Actions
var openModal = {
	actionType : 'openModalAction',
	'view' : {
		type : form,
		mandatory : true
	},
	'viewParameters' : any,
	'viewOutput' : any
};
var refreshGrid = {
	actionType : 'refreshGridAction',
	'gridView' : {
		type : form,
		mandatory : true
	}
};
var back = {
	actionType : 'backAction'
};
var customAction = {
	actionType : 'customAction'
};
