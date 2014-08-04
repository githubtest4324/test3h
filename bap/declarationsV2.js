//////////////////////////////////
// Field types ($type: ...)
//////////////////////////////////

var str = {
    fieldType: 'stringType'
};
/**
 * Contains both date and time
 */
var date = {
    fieldType: 'dateType'
};
var bool = {
    fieldType: 'booleanType'
};
var num = {
    fieldType: 'numberType'
};
var func = {
    fieldType: 'functionType'
};
var list = {
    fieldType: 'listType'
};


//////////////////////////////////
// Display options ($display: ...)
//////////////////////////////////
var none = {
    type: str,
    displayType: 'label'
};
var label = {
    type: str,
    displayType: 'label'
};
var text = {
    type: str,
    displayType: 'text'
};
var textArea = {
    type: str,
    displayType: 'textArea'
};
var checkBox = {
    type: bool,
    displayType: 'checkBox'
};
var datePicker = {
    type: date,
    displayType: 'datePicker'
};
var timePicker = {
    type: date,
    displayType: 'timePicker'
};
var dateTimePicker = {
    type: date,
    displayType: 'dateTimePicker'
};

//////////////////////////////////
// Page element types ($type: ...)
//////////////////////////////////
var page = {
    displayType: 'page'
};
var form = {
    displayType: 'form'
};
var modal = {
    displayType: 'modal'
};
var grid = {
    displayType: 'grid'
};
var template = {
    displayType: 'template'
};
var action = {
    displayType: 'action'
};

//////////////////////////////////
// Data source types ($type: ...)
//////////////////////////////////
var webService = {
    type : 'webService'
};
var randomData = {
    type : 'randomData'
};

//////////////////////////////////
// Action types ($action: ...)
//////////////////////////////////
var refreshGrid = {
    type : 'refreshGrid'
};
var closeModal = {
    type : 'closeModal'
};
var callWs = {
    type : 'callWs'
};


//////////////////////////////////
// Other types ($type: ...)
//////////////////////////////////
var binding = {
    type : 'binding'
};
