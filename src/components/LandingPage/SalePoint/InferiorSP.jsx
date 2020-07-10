import React from "react";
import { connect } from "react-redux";
import { getProduct, setPendingClient } from "../../../Redux/actions";

import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { withStyles } from "@material-ui/core/styles";
import InvButton from "../InvButtonContainer";
const StyledTextField = withStyles(() => ({
  root: {
    marginTop: "1em",
    width: "25%",
    marginLeft: "0em",
    marginRight: "2em",
  },
}))(TextField);
const StyledFabMoney = withStyles(() => ({
  root: {
    marginTop: "1.4em",
    marginRight: "2em",
    marginLeft: "2em",
  },
}))(Fab);

class InferiorSP extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      valido: true,
    };
  }
  consulta(value) {
    this.props.getProduct(value);
  }
  //can be used on multiple textfields
  handleChange = (name) => ({ target: { value } }) => {
    this.setState({
      ...this.state.value,
      [name]: value,
    });
  };

  render() {
    const { valido, value } = this.state;
    const { nombre, producto, total } = this.props;
    return (
      <div className="PV-inferior">
        <StyledTextField
          value={value}
          error={!valido}
          helperText={valido ? " " : "Codigo incorrecto"}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              this.consulta(this.state.value);
            }
          }}
          onChange={this.handleChange("value")}
          id="filled-basic"
          label="Codigo"
          variant="filled"
        />
        <InvButton></InvButton>
        <StyledFabMoney
          variant="extended"
          disabled={nombre !== "Nombre" && producto.length !== 0 ? false : true}
        >
          <MonetizationOnIcon></MonetizationOnIcon>
          Venta
        </StyledFabMoney>
        <h1 className="total">{total}</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pV: state.landingPage.pV,
    nombre: state.landingPage.pV.client.Nombre,
    total: state.landingPage.pV.client.Total,
    producto: state.landingPage.pV.Productos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct(id)),
    setPendingClient: (client, products) =>
      dispatch(setPendingClient(client, products)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InferiorSP);
