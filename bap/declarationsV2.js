//////////////////////////////////
// Field types ($type: ...)
//////////////////////////////////

var str = "str";
/**
 * Contains both date and time
 */
var date = "date";
var bool = "bool";
var num = "num";
var func = "func";
var list = "list";


//////////////////////////////////
// Field types. To be used inside $fields
//////////////////////////////////
var none = "none";
var label = "label";
var text = "text";
var textArea = "textArea";
var checkBox = "checkBox";
var datePicker = "datePicker";
var timePicker = "timePicker";
var dateTimePicker = "dateTimePicker";
var button = "button";

//////////////////////////////////
// View element types. To be used inside a $view
//////////////////////////////////
/**
 * It is at the top of the view chain. Has a controller and a url attached.
 */
var page = "page";
/**
 * Groups other views or fields.
 */
var container = "container";
/**
 * Groups other views or fields. Has a form like ui border.
 */
var form = "form";
/**
 * Groups other views or fields and shows them in a modal dialog. Initially it is hidden.
 */
var modal = "modal";
/**
 * %model must be of type 'list'.
 * Data model is saved in 'items'.
 * Selected model is saved in 'selected'.
 */
var grid = "grid";
var buttonGroup = "buttonGroup";

//////////////////////////////////
// Data source types ($type: ...)
//////////////////////////////////
var webService = "webService";
var randomData = "randomData";

//////////////////////////////////
// Action types ($action: ...)
//////////////////////////////////
var refreshGrid = "refreshGrid";
var openModal = "openModal";
var closeModal = "closeModal";
var callWs = "callWs";
var bind = "callWs";


//////////////////////////////////
// Other types ($type: ...)
//////////////////////////////////
var binding = "binding";
