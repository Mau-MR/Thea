import React from "react";
import SuperiorSP from "./SuperiorSP";
import InferiorSP from "./InferiorSP";
import ProductTable from "./CostumTable";

class PV extends React.Component {
  constructor() {
    super();
    this.state = {
      //this is a mock of data for the table
      Columns: ["Cantidad", "Descripcion", "Codigo", "Precio", "Importe"],
    };
  }
  //Actualiza el valor del textfield
  render() {
    const { Columns } = this.state;
    return (
      <div className="content-div">
        <div style={{ opacity: "0" }}>-</div>
        <SuperiorSP></SuperiorSP>
        <ProductTable Columns={Columns}></ProductTable>
        <InferiorSP></InferiorSP>
      </div>
    );
  }
}
export default PV;
