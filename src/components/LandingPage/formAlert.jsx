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

const styles = theme =>({
    TextField:{
        margin:"auto",
        marginTop :"1em",
        width:"90%"
    },
    contenedor:{  
        width:"70%",
        margin:"auto",
        textAlign:"center"
    },
    head:{
      background:"red"
    },
    DatePicker:{
        marginTop:"1.2em",
        marginLeft: "0em",
        marginRight: "1em",
        width: "250px",

    }
})
export default withStyles(styles) (class FormDialog extends Component {
constructor(props){
    super(props);
    this.db = firebase.firestore();
    this.state = {
        valido:true,
        open:false,
        Cliente:{
          Numero:"",
        },
        text:""
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
consulta(value){
    var docRef = this.db.collection("Cliente").doc(value);

    docRef.get().then((doc) =>{
        if (doc.exists) {
            console.log("Document data:", doc.data());
            this.props.User(doc.data().Nombre,doc.data().Apellido,doc.data().Numero)
            this.setState({
                open: false,
                valido: true,
                Cliente:{
                    Numero:"",
                }
            })
        } else {
            // doc.data() will be undefined in this case
            this.setState({
              valido:false
            })
            this.props.User("Nombre",99)
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
}


render(){
    const {open, Cliente: {Numero}} = this.state,{classes} =this.props
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Buscar
          </Button>
          <Dialog open={open} onClose={this.handleClickOpen} aria-labelledby="form-dialog-title">
            <DialogContent className ={classes.contenedor}>
            <DialogTitle id="form-dialog-title" >Registrar</DialogTitle>
              <DialogContentText>
                Busca tu cliente llenando uno de sus datos y buscando en la tabla
              </DialogContentText>
              
                <TextField
                    error={this.state.Cliente.Numero === ""}
                    helperText={this.state.valido ? ' ' : 'El numero no existe en nuestra base'}
                    className={classes.TextField}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          this.consulta(this.state.Cliente.Numero)
                        }
                      }}
                    id="Numero"
                    label="Numero"
                    variant="outlined"
                    value = {Numero}
                    onChange ={this.handleChange("Numero")}
                    color="secondary"
                    
                />
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