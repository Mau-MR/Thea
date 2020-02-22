import React from 'react'
import Cliente from "./formAlert";
import PIncio from "./PInicio"
import PFnal from "./PFinal"
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
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
        marginLeft:0,
        marginRight:0

    },
    textfieldtable:{
        padding: 0,
        margin :0,
        width:95,
     
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
    cabecera:{
          background:"rgb(52,52,132)"
      },
    money:{
        marginTop:".7em",
        marginLeft:5,
        height: 55,
        width: 55

    },

})

export default withStyles(styles) (class PV extends React.Component {
    //El maravilloso estado
    constructor(){
        super();
        this.selectUser=this.selectUser.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.db= firebase.firestore();
        
        this.state={
            Value:"",
            Fecha:"",
            Cita:"",
            Servicio:"",
            DescripcionServicio:"",
            DPestañas:"",
            DescripcionPestaña:"",
            PInicio:"",
            PFinal:"",
            Lashista:"",
            Mapeo:"",
            Observaciones:"",
            Valido:true,
            Nombre:"Nombre",
            Bitacora : [],
            Id:99,
            Disable: true,
        }
    }
    //Parte que configura El nombre una vez introducido el numero, se llama en form Alert como Prop para pasarle los datos
    selectUser(nombre,id){
        this.setState({
            Nombre:nombre,
            Id:id,
        })
    }
    //Hace la llamada del codigo del producto para ver si existe y obtener sus datos 
    consulta(value,target){
        
        var docRef = this.db.collection("Productos").doc(value);
        docRef.get().then((doc) =>{
            
            if (doc.exists) {
                this.setState({
                    [target]:doc.data().Descripcion
                })
                console.log(this.state)
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
        const {classes} =this.props, {Value, Fecha,Cita,Servicio,DescripcionServicio, DPestañas,DescripcionPestaña, PInicio, PFinal, Lashista, Mapeo,Observaciones,Bitacora}=this.state
        return (
            <div className ="content-div" >
                <div style = {{opacity :"0"}}>-</div>
                <div className="bt-button-container">
                    <h3 className="bt-client-name">{this.state.Nombre}</h3>
                    <Cliente User={this.selectUser}></Cliente>
                    <div style ={{opacity:"0"}}>-</div>
                </div>
                    <TableContainer className ={classes.contenedor}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <StyledTableCell align="center" className={classes.cabecera}>Fecha</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Cita</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Servicio</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>D.Pestaña</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>P.Inicio</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>P.Final</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Lashista</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Mapeo</StyledTableCell>
                                    <StyledTableCell align="center" className ={classes.cabecera}>Observaciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Bitacora.map(row => (
                                    <StyledTableRow key={row.Entryid}>
                                        <StyledTableCell align="center" padding ="none"></StyledTableCell>
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
                    <InvButton></InvButton>
                    <div style = {{opacity :"0", marginLeft:10}}>-</div>
                
                    <TextField
                    value={Servicio}
                    error={!this.state.Valido}
                    helperText={this.state.Valido ? DescripcionServicio : 'Incorrecto'}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                        this.consulta(Servicio,ev.target.id)
                        }
                        
                    }}
                    onChange ={this.handleChange("Servicio")}
                    InputProps={{
                        className:classes.textfieldtable
                    }}
                    id="DescripcionServicio" 
                    label="Servicio" 
                    variant="outlined" 
                    className={classes.TextField}/>
                   
                    <TextField
                    value={DPestañas}
                    error={!this.state.Valido}
                    helperText={this.state.Valido ? DescripcionPestaña : 'Incorrecto'}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                        this.consulta(DPestañas,ev.target.id)
                        }
                    }}
                    onChange ={this.handleChange("DPestañas")}
                    InputProps={{
                        className:classes.textfieldtable
                    }}
                    id="DescripcionPestaña" 
                    label="D.Pestaña" 
                    variant="outlined" 
                    className={classes.TextField}/>
                    
                    <PIncio></PIncio>
                    <PFnal></PFnal>
                    
                    <FormControl>
                        <InputLabel id="Lashista" style={{marginTop:11,marginLeft:8}}>Lashista</InputLabel>
                        <Select
                        value={Lashista}
                        onChange ={this.handleChange("Lashista")}
                        id="Lashista" 
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                        style={{height:55,width:80, marginRight:100}}
                        variant="outlined" 
                        className={classes.TextField}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                    value={Mapeo}
                    error={!this.state.Valido}
                    helperText={this.state.Valido ? ' ' : 'Incorrecto'}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                        this.consulta(this.state.Value)
                        console.log(this.state)
                        }
                    }}
                    onChange ={this.handleChange("Mapeo")}
                    InputProps={{
                        className:classes.textfieldtable
                    }}
                    id="filled-basic" 
                    label="Mapeo" 
                    variant="outlined" 
                    className={classes.TextField}/>
                    <TextField
                    value={Observaciones}
                    onChange ={this.handleChange("Observaciones")}
                    InputProps={{
                        className:classes.textfieldtable
                    }}
                    id="filled-basic" 
                    label="Obs" 
                    variant="outlined" 
                    className={classes.TextField}/>

                    <IconButton
                    className={classes.money}>
                        <PublishIcon></PublishIcon>
                    </IconButton>
                   
                </div>
                
            </div>
        )
    }
})
