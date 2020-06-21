import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "firebase";
import "firebase/firestore";

const styles = (theme) => ({
  TextField: {
    margin: "auto",
    marginTop: "1em",
    width: "90%",
  },
  contenedor: {
    width: "70%",
    margin: "auto",
    textAlign: "center",
  },
});
export default withStyles(styles)(
  class CellPopUp extends Component {
    constructor() {
      super();
      this.db = firebase.firestore();
      this.state = {
        open: false,
        valid: true,
        apointment: {
          name: "*****",
          surname: "*****",
          phone: "",
          id: "",
          employee: "",
          startHour: "",
          endHour: "",
        },
      };
    }

    handleClickOpen = () => {
      this.setState({
        open: !this.state.open,
      });
    };
    handleChange = (name) => ({ target: { value } }) => {
      this.setState({
        apointment: {
          ...this.state.apointment,
          [name]: value,
        },
      });
    };

    consulta(value) {
      var docRef = this.db.collection("Cliente").doc(value);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({
              valid: true,
              apointment: {
                ...this.state.apointment,
                name: doc.data().Nombre,
                surname: doc.data().Apellido,
              },
            });
            console.log(this.state);
          } else {
            // doc.data() will be undefined in this case
            this.setState({
              valido: false,
              apointment: {
                ...this.state.apointment,
                name: "*****",
                surname: "*****",
              },
            });
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    render() {
      const {
          open,
          valid,
          apointment: {
            name,
            surname,
            phone,
            id,
            employee,
            startHour,
            endHour,
          },
        } = this.state,
        { classes } = this.props;
      return (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
          >
            Registrar
          </Button>
          <Dialog
            open={open}
            onClose={this.handleClickOpen}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent className={classes.contenedor}>
              <DialogTitle id="form-dialog-title">Registrar</DialogTitle>
              <DialogContentText>
                Llena el siguente formulario con toda la información necesaria
              </DialogContentText>
              <DialogContentText>{name + " " + surname}</DialogContentText>
              <TextField
                className={classes.TextField}
                id="margin-dense"
                variant="outlined"
                label="Telefono"
                error={!valid}
                helperText={valid ? " " : "El numero no existe en nuestra base"}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    this.consulta(this.state.apointment.phone);
                  }
                }}
                value={phone}
                margin="dense"
                onChange={this.handleChange("phone")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickOpen} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
);
