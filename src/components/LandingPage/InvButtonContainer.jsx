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
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
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
        marginTop:"1.2em",
       
        background:"rgb(52,52,132)",
        color:"white"

    }
})
export default withStyles(styles) (class InvButton extends Component {
constructor(){
    super();
    this.db = firebase.firestore();
    this.state = {
        open:false,
        speed:10,
        Cliente:{
            Nombre:"",
            Apellido:"",
            Correo:"",
            Numero:"",
            Nacimiento:""
        }
    }
}


handleClickOpen = ()=>{
    this.setState({
        open: !this.state.open
    })
}
handleChange = name => ({target:{value}}) =>{
    this.setState({
      Cliente:{
        ...this.state.Cliente,
        [name]:value
        
      }
    })
}
handleSubmit = ()=>{
    //validarprro
    console.log(typeof(this.state.Cliente.Numero))
   this.db.collection("Cliente").doc(this.state.Cliente.Numero).set({
    Nombre: this.state.Cliente.Nombre,
    Apellido: this.state.Cliente.Apellido,
    Correo: this.state.Cliente.Correo,
    Numero: this.state.Cliente.Numero,
    Nacimiento: this.state.Cliente.Nacimiento
   })
   .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
    this.setState({
        open: false,
        Cliente:{
            Nombre:"",
            Apellido:"",
            Correo:"",
            Numero:"",
            Nacimiento:""
        }
    })
}
render(){
    const {open, Cliente: {Nombre,Apellido,Correo,Numero,Nacimiento}} = this.state,{classes} =this.props
    return (
        <div>
            <Fab onClick={this.handleClickOpen} className ={classes.SearchButton}>
                <SearchIcon className={classes.extendedIcon} />
            </Fab>
          <Dialog open={open} onClose={this.handleClickOpen} aria-labelledby="form-dialog-title">
            <DialogContent className ={classes.contenedor}>
            <DialogTitle id="form-dialog-title" >Registrar</DialogTitle>
              <DialogContentText>
                Llena el siguente formulario con toda la información necesaria
              </DialogContentText>
              <TextField
                    className={classes.TextField}
                    id="Nombre"
                    label="Nombre"
                    variant="outlined"
                    color="secondary"
                    value ={Nombre}
                    onChange = {this.handleChange("Nombre")}
                />
                <TextField
                    className={classes.TextField}
                    id="Apellido"
                    label="Apellido"
                    variant="outlined"
                    value={Apellido}
                    onChange = { this.handleChange("Apellido")}
                    color="secondary"
                />
                <TextField
                    className={classes.TextField}
                    id="Correo"
                    label="Correo"
                    variant="outlined"
                    value={Correo}
                    onChange ={this.handleChange("Correo")}
                    color="secondary"
                />
                <TextField
                    className={classes.TextField}
                    id="Numero"
                    label="Numero"
                    variant="outlined"
                    value = {Numero}
                    onChange ={this.handleChange("Numero")}
                    color="secondary"
                    
                />
                <TextField
                    className ={classes.DatePicker}
                    id="date"
                    label="Fecha de Nacimiento"
                    type="date"
                    value={Nacimiento}
                    onChange = {this.handleChange("Nacimiento")}
                    InputLabelProps={{
                    shrink: true,
                    }}
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

  
})