import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  divButton: {
    marginTop: "1em",
    width: "25%",
    height: "3.5em",
    marginLeft: "0em",
    marginRight: 10,
    background: "black",
  },
  TextField: {
    marginTop: "1em",
    width: "25%",
    marginLeft: 20,
    marginRight: 20,
  },
  textfieldtable: {
    padding: 0,
    margin: 0,
    height: 42,
    width: 70,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  content: {
    margin: "auto",
  },
});
export default withStyles(styles)(
  class PInicio extends Component {
    constructor() {
      super();
      this.state = {
        Open: false,
        Izquierdo: 0,
        Derecho: 0,
        btnValue: "P.Inicio",
      };
    }
    handleClick = () => {
      this.setState({
        Open: !this.state.Open,
      });
    };
    handleChange = (name) => ({ target: { value } }) => {
      this.setState({
        [name]: value,
      });
    };
    handleSubmit = () => {
      this.setState({
        Open: !this.state.Open,
        btnValue: "I:" + this.state.Izquierdo + "/" + this.state.Derecho,
      });
    };
    render() {
      const { classes } = this.props,
        { Open, Izquierdo, Derecho, btnValue } = this.state;
      return (
        <div>
          <Button
            onClick={this.handleClick}
            style={{
              height: "55px",
              width: "20px",
              marginRight: "15px",
              marginTop: "17px",
            }}
            variant="outlined"
          >
            {btnValue}
          </Button>
          <Dialog open={Open} onClose={this.handleClick}>
            <DialogTitle>Pestañas de Inicio</DialogTitle>
            <DialogContent className={classes.content}>
              <div className={classes.container}>
                <TextField
                  value={Izquierdo}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      console.log(this.state);
                    }
                  }}
                  onChange={this.handleChange("Izquierdo")}
                  InputProps={{
                    className: classes.textfieldtable,
                  }}
                  id="IIzq"
                  label="Izquierdo"
                  variant="outlined"
                  type="number"
                  className={classes.TextField}
                />

                <TextField
                  value={Derecho}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      console.log(this.state);
                    }
                  }}
                  onChange={this.handleChange("Derecho")}
                  InputProps={{
                    className: classes.textfieldtable,
                  }}
                  id="IDer"
                  label="Dercho"
                  variant="outlined"
                  type="number"
                  className={classes.TextField}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClick} color="primary">
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
