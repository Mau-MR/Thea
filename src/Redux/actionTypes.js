//Actions of landingPage
export const CHANGE_VIEW = "viewChanged";
export const RESET_PV_TO_ORIGINAL_VALUES = "SPReset";
export const MODIFY_PRODUCT_QTY = "qtyUpdated";
//Pending client list
export const POP_PENDING_CLIENT_DIALOG = "popPendingClientDialog";
export const OPEN_PENDING_SALE = "saleOpened";

//Async actions from firebase
//Related with products
export const GETTING_PRODUCT = "gettingProduct";
export const PRODUCT_EXIST = "productExist";
export const PRODUCT_NOT_EXIST = "productNotExist";
export const PRODUCT_FAIL = "productFail";
//related with clients
export const GETTING_CLIENT = "gettingClient";
export const CLIENT_EXIST = "clientExist";
export const CLIENT_NOT_EXIST = "clientDontExist";
export const CLIENT_FAIL = "failClient";
//Pending clients
export const SETTING_PENDING_CLIENT = "settingPendingClient";
export const PENDING_CLIENT_SUCCESS = "successPendingClient";
export const UPDATE_PENDING_CLIENT = "clientUpdated";
export const PENDING_CLIENT_FAIL = "failPendingClient";
//Pending Sales List
export const GETTING_PENDING_SALES = "gettingPendingSales";
export const PENDING_SALES_SUCCES = "pendingSalesObtained";
export const PENDING_SALES_FAIL = "pendingSalesFailed";
