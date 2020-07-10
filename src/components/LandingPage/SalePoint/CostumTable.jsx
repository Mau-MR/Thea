import React from "react";
import { modifyQty } from "./../../../Redux/actions";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
    cabecera: {
      background: "rgb(52,52,132)",
    },
  },
}))(TableRow);
const StyledTableContainer = withStyles(() => ({
  root: {
    background: "rgb(225,226,230)",
    width: "90%",
    height: "49vh",
    margin: "auto",
    marginTop: "1em",
    borderRadius: "10px",
    fontFamily: "Cabin",
  },
}))(TableContainer);
const StyledTableTextField = withStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    height: 42,
    width: 70,
  },
}))(TextField);
const StyledTable = withStyles(() => ({
  root: {
    width: "100%",
  },
}))(Table);

function CostumTable(props) {
  const { Producto, Columns } = props;
  return (
    <StyledTableContainer>
      <StyledTable aria-label="customized table">
        <TableHead>
          <TableRow>
            {Columns.map((column) => (
              <StyledTableCell key={column} align="center">
                {column}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Producto.map((row, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" padding="none">
                  <StyledTableTextField
                    value={row.Cantidad}
                    onChange={({ target: { value } }) => {
                      props.modifyQty(value, index);
                    }}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        ev.target.blur();
                      }
                    }}
                    label="Qty"
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </StyledTableCell>
                <StyledTableCell align="center" padding="none">
                  {row.Descripcion}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Codigo}</StyledTableCell>
                <StyledTableCell align="center">{row.Precio}</StyledTableCell>
                <StyledTableCell align="center">{row.Importe}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}
const mapState = (state) => {
  return {
    Producto: state.landingPage.pV.Productos,
  };
};
const mapDispatch = (dispatch) => {
  return {
    modifyQty: (newQty, index) => dispatch(modifyQty(newQty, index)),
  };
};
export default connect(mapState, mapDispatch)(CostumTable);
