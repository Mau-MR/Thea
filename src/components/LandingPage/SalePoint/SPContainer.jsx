import React from "react";
import SuperiorSP from "./SuperiorSP";
import InferiorSP from "./InferiorSP";
import ProductTable from "./CostumTable";

import { connect } from "react-redux";

class PV extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.consulta = this.consulta.bind(this);
    this.state = {
      //this is a mock of data for the table
      Columns: ["Cantidad", "Descripcion", "Codigo", "Precio", "Importe"],
      Valido: true,
      Seleccionado: null,
      Value: "",
      Pid: 0,
    };
  }
  //Actualiza el valor del textfield
  render() {
    const { Value, Valido, Columns } = this.state;
    console.log("wachame me he renderizado a lo pendejo");
    return (
      <div className="content-div">
        <div style={{ opacity: "0" }}>-</div>
        <SuperiorSP></SuperiorSP>
        <ProductTable Columns={Columns}></ProductTable>
        <InferiorSP
          Valido={Valido}
          Value={Value}
          Nombre={this.props.Nombre}
          Producto={this.props.pV.Productos}
          Total={this.props.total}
          consulta={this.consulta}
          handleChange={this.handleChange}
        ></InferiorSP>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PV);
