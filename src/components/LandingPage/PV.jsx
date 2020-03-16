import React from 'react'
import Cliente from "./formAlert";
import Registrar from "./Registrar";
import {withStyles} from '@material-ui/core/styles';
import firebase from "firebase";
import "firebase/firestore"
import 'firebase/auth'

import TextField from '@material-ui/core/TextField';
import InvButton from "./Inv-button";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Fab from '@material-ui/core/Fab';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import Pendiente from "./Pendiente";
import Tooltip from '@material-ui/core/Tooltip';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },

  }))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
const styles = theme =>({
    TextField:{
    
        marginTop :"1em",
        width:"25%",
        marginLeft:"0em",
        marginRight:"2em"

    },
    textfieldtable:{
        padding: 0,
        margin :0,
        height:42,
        width:70
    },
    table: {
        width: "100%",
      },
    contenedor:{  
       background:"rgb(225,226,230)",
       width:"90%",
       height:"49vh",
       margin: "auto",
       marginTop:"1em",
       borderRadius:"10px",
       fontFamily: 'Cabin',
      
      },
    head:{
        background:"red"
      },
    cabecera:{
          background:"rgb(52,52,132)"
      },
    money:{
        marginTop:"1.4em",
        marginRight:"2em",
        marginLeft:"2em",
    },
    pendiente:{
        size:"small"
    }
})

export default withStyles(styles) (class PV extends React.Component {
    //El maravilloso estado
    constructor(){
        super();
        this.selectUser=this.selectUser.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.db= firebase.firestore();
        this.showTotal = this.showTotal.bind(this)
        this.abrir = this.abrir.bind(this)
        this.state={
            Nombre:"Nombre",
            Apellido:"Apellido",
            Total:0,
            Valido: true,
            Telefono:99,
            Seleccionado:null,
            Producto:[]
        }
    }
    //Parte que configura El nombre una vez introducido el numero, se llama en form Alert como Prop para pasarle los datos
    selectUser(nombre,apellido,tel){
        this.setState({
            Nombre:nombre,
            Apellido:apellido,
            Telefono:tel,
        })
    }
    //Hace la llamda del codigo del producto para ver si existe y obtener sus datos 
    consulta(value){
        var docRef = this.db.collection("Productos").doc(value);
        docRef.get().then((doc) =>{
            let {Producto}=this.state
            
            if (doc.exists) {
                Producto.push({
                    Entryid: Producto.length+1,
                    Cantidad:1,
                    Descripción:doc.data().Descripcion,
                    Codigo:doc.data().Codigo,
                    Precio:doc.data().Precio,
                    Importe:doc.data().Precio
                  })
                this.setState({
                    Valido: true,
                    Value:"",
                    Producto
                })
            } else {
                //doc.data() will be undefined in this case
                this.setState({
                  Valido:false
                })
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
    }
    //Actualiza el valor del textfield
    handleChange = name => ({target:{value}}) =>{
        this.setState({
            ...this.state.Value,
            [name]:value
        })
    }
showTotal(){
    var tot = this.state.Producto.map((x)=>{
        return x.Importe
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    this.setState({
        Total: tot.reduce(reducer)
    })
}
pendiente(){
   this.db.collection("Sucursal").doc(firebase.auth().currentUser.uid).set({
        Nombre: this.state.Nombre,
        Apellido: this.state.Apellido,
        Telefono:this.state.Telefono,
        Productos:this.state.Producto,
        Total: this.state.Total
   },{merge:true}).then(()=>{
        this.setState({
            Qty:1,
            Total:0,
            Value:"",
            Valido:true,
            Nombre:"Nombre",
            Apellido:"Apellido",
            Telefono:99,
            Disable: true,
            Producto:[]
        })
    }).catch(function(error) {
    console.error("Error adding document: ", error);
    });
}
abrir(Nomb, Apelli, Tel, Product, tot){
    this.setState({
        Nombre: Nomb,
        Apellido: Apelli,
        Telefono: Tel, 
        Producto: Product,
        Total:tot
    })
}

    render() {
        const {classes} =this.props, {Value, Producto, Total}=this.state
        return (
            <div className ="content-div" >
                <div style = {{opacity :"0"}}>-</div>
                <div className="pv-button-container">
                    <Pendiente Open={this.abrir}></Pendiente>
                    <Tooltip title="Deja como Pendiente">
                        <Fab 
                            color="primary" 
                            aria-label="add" 
                            className={classes.pendiente} 
                            size = "small"
                            onClick = {()=>this.pendiente()}
                            disabled={(this.state.Nombre !=="Nombre")? false : true }>
                                <UnarchiveIcon/>
                        </Fab>
                    </Tooltip>
                        
                    <h3 className="client-name">{this.state.Nombre}</h3>
                    <Cliente User={this.selectUser}></Cliente>
                    <div style ={{opacity:"0"}}>-</div>
                    <Registrar></Registrar>
                </div>
                    <TableContainer className ={classes.contenedor}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <StyledTableCell align="center" className={classes.cabecera}>Cantidad</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Descripción</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Codigo</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Precio</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Importe</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.Producto.map(row => (
                                    <StyledTableRow key={row.Entryid}>
                                        <StyledTableCell align="center" padding ="none">
                                            <TextField
                                                value={row.Cantidad}
                                                InputProps={{
                                                    className:classes.textfieldtable
                                                }}
                                                onChange = { ({target:{value}})=>{
                                                    this.setState({
                                                    ...Producto[row.Entryid-1].Cantidad = value,
                                                    ...Producto[row.Entryid-1].Importe=Producto[row.Entryid-1].Precio*value,
                                                })}}
                                                onBlur={()=>{this.showTotal()}}
                                                onKeyPress={(ev) => {
                                                    if (ev.key === 'Enter') {
                                                    this.showTotal()
                                                    ev.target.blur()
                                                    }
                                                }}
                                                label="Qty" 
                                                variant="outlined" 
                                                size ="small"
                                                type="number"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center" padding="none">{row.Descripción}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Codigo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Precio}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Importe}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                <div className="PV-inferior">
                    <TextField
                    value={Value}
                    error={!this.state.Valido}
                    helperText={this.state.Valido ? ' ' : 'Codigo incorrecto'}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                        this.consulta(this.state.Value)
                        console.log(this.state)
                        }
                    }}
                    onChange ={this.handleChange("Value")}
                    id="filled-basic" 
                    label="Codigo" 
                    variant="filled" 
                    className={classes.TextField}/>
                    <InvButton></InvButton>
                    <Fab 
                    variant="extended"
                    className={classes.money} 
                    disabled={(this.state.Nombre !=="Nombre")&&(this.state.Producto.length!==0)? false : true }>
                    <MonetizationOnIcon ></MonetizationOnIcon>
                        Venta
                    </Fab>
                    <h1 className="total">{Total}</h1>

                </div>
                
            </div>
        )
    }
})
