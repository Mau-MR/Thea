import * as actions from "./actionTypes";
import firebase from "../components/firebase";

//Actions creators of the landing page
export function changeLandingPageView(newView) {
  return {
    type: actions.CHANGE_VIEW,
    text: "Changes the view of the landigPage",
    newView,
  };
}
export const openPendingSale = (sale) => {
  return {
    type: actions.OPEN_PENDING_SALE,
    text: "Opens a client from the pending sales list",
    payload: sale,
  };
};
export const modifyQty = (newQty, index) => {
  return {
    type: actions.MODIFY_PRODUCT_QTY,
    payload: { newQty, index },
  };
};
export const popPendingClientDialog = () => {
  return {
    type: actions.POP_PENDING_CLIENT_DIALOG,
    text: "Opens the dialog of the pending sales",
  };
};
//Asyn actions of firebase
export const setPendingClient = (client, products) => async (dispatch) => {
  dispatch({ type: actions.SETTING_PENDING_CLIENT });
  if (client.Cid === 0) {
    console.log(client, products);
    await firebase
      .setPendingClient(client, products)
      .then((docRef) => {
        console.log(docRef.id);
        dispatch({ type: actions.PENDING_CLIENT_SUCCESS });
        dispatch({ type: actions.RESET_PV_TO_ORIGINAL_VALUES });
      })
      .catch((error) => dispatch({ type: actions.PENDING_CLIENT_FAIL, error }));
  } else {
    await firebase
      .updatePendingClient(client, products)
      .then(() => {
        dispatch({ type: actions.UPDATE_PENDING_CLIENT });
        dispatch({ type: actions.RESET_PV_TO_ORIGINAL_VALUES });
      })
      .catch((error) => dispatch({ type: actions.PENDING_CLIENT_FAIL, error }));
  }
};
export const getClient = (phone) => async (dispatch) => {
  dispatch({ type: actions.GETTING_CLIENT });
  await firebase
    .getClient(phone)
    .then((doc) => {
      if (doc.exists) {
        dispatch({ type: actions.CLIENT_EXIST, payload: doc.data() });
      } else {
        dispatch({ type: actions.CLIENT_NOT_EXIST });
      }
    })
    .catch((error) => {
      dispatch({ type: actions.CLIENT_FAIL, error });
    });
};
export const getPendingSales = () => async (dispatch) => {
  dispatch({ type: actions.GETTING_PENDING_SALES });
  firebase
    .getPendingSales()
    .then((docRef) => {
      const sales = docRef.docs.map((doc) => {
        var rObj = {};
        rObj[doc.id] = doc.data();
        return rObj;
      });
      dispatch({ type: actions.PENDING_SALES_SUCCES, payload: sales });
    })
    .catch((error) => {
      dispatch({ type: actions.PENDING_SALES_FAIL, error });
    });
};
export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: actions.GETTING_PRODUCT });

  await firebase
    .getProduct(id)
    .then((doc) => {
      if (doc.exists) {
        const product = doc.data();
        product["Cantidad"] = 1;
        product["Importe"] = doc.data().Precio;
        dispatch({ type: actions.PRODUCT_EXIST, payload: product });
      } else {
        //doc.data() will be undefined in this case
        dispatch({ type: actions.PRODUCT_NOT_EXIST });
      }
    })
    .catch((error) => {
      dispatch({ type: actions.PRODUCT_FAIL, error });
    });
};
