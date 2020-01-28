
import "./landingPage.css";
import React, { Component } from 'react';
import ButtonLayout from "./buttonLayot";
import {Link} from "react-router-dom";

export default class landingPage extends Component {

  render() {
        return (
            <div className = "main-div">

                <div className ="view">
                    <div className ="layout"> 
                        <i className = "fa fa-th-list"></i>
                    </div>
                    <ButtonLayout firebase ={this.app}></ButtonLayout>
                </div>

                <div className = "side-bar"> 
                    <div className ="icon-div">
                        <i className = "fa fa-bell" style={{paddingRight: "2em"}}></i>
                        <i className = "fa fa-user" style={{paddingRight: "5em"}}></i>
                    </div>
                    <div>
                        <h2 className = "header-div">Bases</h2>
                        <div className ="biggbutton-sidebar">
                            <Link className="bbutton" to="/productos"> 
                                <i className = "fa fa-folder"
                                style={{color:"rgb(95,89,165)",
                                fontSize:"30px",
                                paddingTop:"20px",
                                paddingLeft:"20px"}}></i>
                                <h3 className ="bbutton-header">Productos</h3> 
                                <h5 className ="bbutton-header">Materiales, servicios, codigos</h5> 
                            </Link>
                            <Link to="/clientas" className="bbutton">
                                <i className = "fa fa-folder"
                                style={{color:"rgb(228,95,99)",
                                fontSize:"30px",
                                paddingTop:"20px",
                                paddingLeft:"20px"}}></i>
                                <h3 className = "bbutton-header">Clientas</h3> 
                                <h5 className = "bbutton-header">Contactos, bitacoras, registros</h5> 
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2 className = "header-div">Reciente</h2>
                        <div className ="recent-div"></div>
                    </div>
                    </div>
            </div>
        )
    } 
}
