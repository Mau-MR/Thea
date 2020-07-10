import InfoBar from "./InfoBarComponent";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

const messages = [
  {
    id: 1,
    primary: "Maria Fernanda Alonso Aguirre",
    secondary: "Fecha de nacimiento: 05/11/1989",
  },
  {
    id: 2,
    primary: "Brenda Gudiño Fernandez Estrada",
    secondary: "Fecha de nacimiento: 24/11/1979",
  },
  {
    id: 3,
    primary: "Monica Alfonso Laguin",
    secondary: "Fecha de nacimiento: 08/06/2000",
  },
];

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: "0em",
    paddingRight: "0em",
  },
  butto: {
    background: "white",
    margin: "auto",
    marginTop: ".5em",
    borderRadius: "10px",
    width: "90%",
    fontFamily: "Cabin",
    display: "block",
  },
  chip: {
    background: "rgb(213,78,103)",
    color: "white",
  },
  textField: {
    width: "60%",
    height: "6em",
    margin: "auto",
    marginTop: "3em",
    fontSize: "10px",
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <div className="fragment-div">
      <div className="client-bar">
        <div>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Busqueda"
              variant="outlined"
              className={classes.textField}
            />
          </form>
        </div>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              <ListItem button className={classes.butto}>
                <Chip size="small" label="Pestañas" className={classes.chip} />
                <ListItemText primary={primary} secondary={secondary} l />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </div>
      <div className="info-bar">
        <InfoBar></InfoBar>
      </div>
    </div>
  );
}
