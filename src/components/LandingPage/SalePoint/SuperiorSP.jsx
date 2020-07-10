import React from "react";
import Pendiente from "./Pendiente";
import Cliente from "../FormAlert";
import { connect } from "react-redux";
import { setPendingClient } from "./../../../Redux/actions.js";

import UnarchiveIcon from "@material-ui/icons/Unarchive";
import Registrar from "./Registrar";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";

const StyledPendingFab = withStyles(() => ({
  pendiente: {
    size: "small",
  },
}))(Fab);
function SuperiorSP(props) {
  const { setPendingClient, client, products } = props;
  return (
    <div className="pv-button-container">
      <Pendiente></Pendiente>
      <Tooltip title="Deja como Pendiente">
        <StyledPendingFab
          color="primary"
          aria-label="add"
          size="small"
          onClick={() => setPendingClient(client, products)}
          disabled={client.Nombre !== "Nombre" ? false : true}
        >
          <UnarchiveIcon />
        </StyledPendingFab>
      </Tooltip>
      <h3 className="client-name">{client.Nombre}</h3>
      <Cliente></Cliente>
      <div style={{ opacity: "0" }}>-</div>
      <Registrar></Registrar>{" "}
    </div>
  );
}
const mapState = (state) => {
  return {
    client: state.landingPage.pV.client,
    products: state.landingPage.pV.Productos,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setPendingClient: (client, products) =>
      dispatch(setPendingClient(client, products)),
  };
};
export default connect(mapState, mapDispatch)(SuperiorSP);
