import React, {Component}from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from "firebase";
import "firebase/firestore";
import 'firebase/auth'

import Fab from '@material-ui/core/Fab';
import ArchiveIcon from '@material-ui/icons/Archive';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

const styles = theme =>({
    TextField:{
        margin:"auto",
        marginTop :"1em",
        width:"90%"

    },
    extendedIcon: {
        marginRight: theme.spacing(0),
    },
    SearchButton:{
        marginTop:"0em",
        background:"rgb(52,52,132)",
        color:"white",
        marginRight:"1em"

    }
})
const messages = [
    {
      id: 1,
      primary: 'Mauricio Eulalio Merida Rivera',
      secondary: "Fecha de nacimiento: 05/11/1989",
    },
    {
      id: 2,
      primary: 'Brenda Gudiño Fernandez Estrada ',
      secondary: "Fecha de nacimiento: 24/11/1979",
    },
    {
      id: 3,
      primary: 'Monica Alfonso Laguin',
      secondary: 'Fecha de nacimiento: 08/06/2000',
    }
  ];
export default withStyles(styles) (class InvButton extends Component {
    
constructor(){
    super();
    this.db = firebase.firestore();
    this.OpenClient = this.OpenClient.bind(this)
    this.state = {
        open:false,
        Pendientes:[]
    }
}

handleClickOpen = ()=>{
    this.setState({
        open: !this.state.open
    })
}
async OpenClient(){

    var docRef =await this.db.collection("Sucursal").doc(firebase.auth().currentUser.uid).collection("Pendiente").get();
    this.setState({
        open: !this.state.open,
        Pendientes:docRef.docs.map(doc => doc.data())
    })
   console.log(this.state)
   console.log(this.state.Pendientes[0])
}
render(){
    const {open, Pendientes} = this.state,{classes} =this.props
    return (
        <div>
            <Tooltip title ="Abre">
                <Fab onClick={this.OpenClient} className ={classes.SearchButton} size ="small">
                    <ArchiveIcon></ArchiveIcon>
                </Fab>
            </Tooltip>
            
          <Dialog open={open} onClose={this.handleClickOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" >Ventas pendientes</DialogTitle>
            <DialogContentText style ={{marginLeft:25}}>
                Selecciona la cuenta que desees abrir
            </DialogContentText>
            <DialogContent className ={classes.contenedor}>
                <div style={{maxWidth: 350, maxHeight:900}}>
                    <List className={classes.list}>
                        {Pendientes.map((Cliente,index) => (
                            <React.Fragment key={index}>
                                <ListItem button className={classes.butto} onClick={()=>
                                    this.props.Open(Cliente.Nombre,Cliente.Apellido,Cliente.Telefono,Cliente.Productos,Cliente.Total)
                                    
                                    }>
                                    <Chip size="small" label="Pestañas" className={classes.chip}/>
                                    <ListItemText primary={Cliente.Nombre+ " "+Cliente.Apellido} secondary={Cliente.Telefono+"    $"+ Cliente.Total}/>
                                </ListItem>
                            </React.Fragment>
                        ))}
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

  
})