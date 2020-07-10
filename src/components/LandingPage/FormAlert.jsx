import React, { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { connect } from "react-redux";
import { getClient } from "../../Redux/actions";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { setPendingClient } from "../../Redux/actions";

const StyledClientTextField = withStyles(() => ({
  root: {
    margin: "auto",
    marginTop: "1em",
    width: "90%",
  },
}))(TextField);
const StyledClientDialogContent = withStyles(() => ({
  root: {
    width: "70%",
    margin: "auto",
    textAlign: "center",
  },
}))(DialogContent);

class Client extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      valido: true,
      open: false,
      Cliente: {
        Numero: "",
      },
      text: "",
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleChange = (name) => ({ target: { value } }) => {
    this.setState({
      Cliente: {
        ...this.state.Cliente,
        [name]: value,
      },
    });
  };
  consulta(phone) {
    this.props.getClient(phone);
  }

  render() {
    const {
      open,
      Cliente: { Numero },
    } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Buscar
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClickOpen}
          aria-labelledby="form-dialog-title"
        >
          <StyledClientDialogContent>
            <DialogTitle id="form-dialog-title">Registrar</DialogTitle>
            <DialogContentText>
              Busca tu cliente llenando uno de sus datos y buscando en la tabla
            </DialogContentText>

            <StyledClientTextField
              error={this.state.Cliente.Numero === ""}
              helperText={
                this.state.valido ? " " : "El numero no existe en nuestra base"
              }
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  this.consulta(this.state.Cliente.Numero);
                }
              }}
              id="Numero"
              label="Numero"
              variant="outlined"
              value={Numero}
              onChange={this.handleChange("Numero")}
              color="secondary"
            />
          </StyledClientDialogContent>
          <DialogActions>
            <Button onClick={this.handleClickOpen} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapState = (state) => {
  return { client: state.landingPage.pV.client };
};
const mapDispatch = (dispatch) => {
  return {
    getClient: (phone) => dispatch(getClient(phone)),
  };
};
export default connect(mapState, mapDispatch)(Client);
