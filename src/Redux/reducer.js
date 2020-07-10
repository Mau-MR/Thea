import { produce } from "immer";
import * as actionType from "./actionTypes";
import { combineReducers } from "redux";

const initialState = {
  landingPage: {
    visibility: "",
    pV: {
      pendingDialogIsOpen: false,
      pendingClientListIsRead: false,
      Pendientes: {},
      client: {
        Cid: 0,
        Nombre: "Nombre",
        Apellido: "",
        Telefono: 99,
        Total: 0,
      },
      Productos: [],
    },
    binnacle: {},
    calendar: {},
    analitycs: {},
  },
  loggedUser: "",
};

const updateTotal = (draftState) => {
  var total = draftState.pV.Productos.map((x) => x.Importe);
  draftState.pV.client.Total = total.reduce((x, y) => x + y);
};
function firebaseReducer(state, action) {
  switch (action.type) {
    case actionType.PRODUCT_EXIST:
      return produce(state, (draftState) => {
        draftState.pV.Productos.push(action.payload);
        updateTotal(draftState);
      });
    default:
      return state;
  }
}
function landingPageReducer(state = initialState.landingPage, action) {
  switch (action.type) {
    case actionType.CHANGE_VIEW:
      return produce(state, (draftState) => {
        draftState.visibility = action.newView;
      });
    case actionType.PRODUCT_EXIST:
      return firebaseReducer(state, action);

    case actionType.RESET_PV_TO_ORIGINAL_VALUES:
      return produce(initialState.landingPage, (draftState) => {
        draftState.pV.visibility = state.pV.visibility;
        draftState.pV.pendingClientListIsRead =
          state.pV.pendingClientListIsRead;
        draftState.pV.Pendientes = state.pV.Pendientes;
      });
    case actionType.CLIENT_EXIST:
      return produce(state, (draftState) => {
        draftState.pV.client.Nombre = action.payload.Nombre;
        draftState.pV.client.Apellido = action.payload.Apellido;
        draftState.pV.client.Telefono = action.payload.Numero;
      });
    case actionType.PENDING_SALES_SUCCES:
      return produce(state, (draftState) => {
        draftState.pV.pendingClientListIsRead = true;
        draftState.pV.Pendientes = action.payload;
      });
    case actionType.POP_PENDING_CLIENT_DIALOG:
      return produce(state, (draftState) => {
        draftState.pV.pendingDialogIsOpen = !draftState.pV.pendingDialogIsOpen;
      });
    case actionType.OPEN_PENDING_SALE:
      return produce(state, (draftState) => {
        draftState.pV.client = action.payload.client;
        draftState.pV.Productos = action.payload.Productos;
      });
    case actionType.MODIFY_PRODUCT_QTY:
      return produce(state, (draftState) => {
        draftState.pV.Productos[action.payload.index].Cantidad =
          action.payload.newQty;
        draftState.pV.Productos[action.payload.index].Importe =
          action.payload.newQty *
          draftState.pV.Productos[action.payload.index].Precio;
        updateTotal(draftState);
      });
    default:
      return state;
  }
}
const App = combineReducers({
  landingPage: landingPageReducer,
});
export default App;
