import React, { Component } from "react";
import {
  getPendingSales,
  popPendingClientDialog,
  openPendingSale,
} from "../../../Redux/actions";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import ArchiveIcon from "@material-ui/icons/Archive";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

const StyledPendingFab = withStyles(() => ({
  root: {
    marginTop: "0em",
    background: "rgb(52,52,132)",
    color: "white",
    marginRight: "1em",
  },
}))(Fab);

class Pendiente extends Component {
  constructor() {
    super();
    this.OpenClient = this.OpenClient.bind(this);
  }
  handleClickOpen = () => {
    this.props.popDialog();
  };
  OpenClient() {
    if (this.props.listIsRead) {
      console.log(this.props.pendientes);
      this.props.popDialog();
    } else {
      this.props.getPendingSales();
      this.props.popDialog();
    }
  }
  render() {
    const { dialogIsOpen, pendientes } = this.props;
    return (
      <div>
        <Tooltip title="Abre">
          <StyledPendingFab onClick={this.OpenClient} size="small">
            <ArchiveIcon></ArchiveIcon>
          </StyledPendingFab>
        </Tooltip>

        <Dialog
          open={dialogIsOpen}
          onClose={this.handleClickOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ventas pendientes</DialogTitle>
          <DialogContentText style={{ marginLeft: 25 }}>
            Selecciona la cuenta que desees abrir
          </DialogContentText>
          <DialogContent>
            <div style={{ maxWidth: 350, maxHeight: 900 }}>
              <List>
                {Object.values(pendientes).map((Clien, index) => {
                  var arr = Object.values(Clien);
                  var Cliente = arr[0];
                  return (
                    <React.Fragment key={index}>
                      <ListItem
                        button
                        onClick={() =>
                          this.props.openPendingSale({
                            client: {
                              Nombre: Cliente.Nombre,
                              Apellido: Cliente.Apellido,
                              Telefono: Cliente.Telefono,
                              Total: Cliente.Total,
                              Cid: Object.keys(Clien)[0],
                            },
                            Productos: Cliente.Productos,
                          })
                        }
                      >
                        <Chip size="small" label="Pestañas" />
                        <ListItemText
                          primary={Cliente.Nombre + " " + Cliente.Apellido}
                          secondary={Cliente.Telefono + "    $" + Cliente.Total}
                        />
                      </ListItem>
                    </React.Fragment>
                  );
                })}
              </List>
            </div>
          </DialogContent>
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
  return {
    dialogIsOpen: state.landingPage.pV.pendingDialogIsOpen,
    pendientes: state.landingPage.pV.Pendientes,
    listIsRead: state.landingPage.pV.pendingClientListIsRead,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getPendingSales: () => dispatch(getPendingSales()),
    popDialog: () => dispatch(popPendingClientDialog()),
    openPendingSale: (sale) => dispatch(openPendingSale(sale)),
  };
};
export default connect(mapState, mapDispatch)(Pendiente);
