import React, { Component } from 'react'
import Cliente from "./formAlert";
import Registrar from "./Registrar";
import {withStyles} from '@material-ui/core/styles';
import firebase from "firebase";
import "firebase/firestore"
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
        marginLeft:"2em"
     
    }
})

export default withStyles(styles) (class PV extends Component {
    //El maravilloso estado
    constructor(){
      
        super();
        this.selectUser=this.selectUser.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.db= firebase.firestore();
        this.state={
            Total:0,
            Value:"",
            Valido:true,
            Nombre:"Nombre",
            Id:99,
            Disable: true,
            Producto:[]
        }
    }
    //Parte que configura El nombre una vez introducido el numero, se llama en form Alert como Prop para pasarle los datos
    selectUser(nombre,id){
        this.setState({
            Nombre:nombre,
            Id:id,
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


    render() {
        const {classes} =this.props, {Value}=this.state
        return (
            <div className ="content-div" >
                <div style = {{opacity :"0"}}>-</div>
                <div className="pv-button-container">
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
                                <StyledTableCell align="center">{row.Cantidad}</StyledTableCell>
                                <StyledTableCell align="center">{row.Descripción}</StyledTableCell>
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
                    <h1 className="total">{this.state.Total}</h1>

                </div>
                
            </div>
        )
    }
})
