import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
  },
}))(TableRow);

function createData(fecha, servicio, sucursal, monto) {
  return { fecha, servicio, sucursal, monto };
}

const rows = [
  createData("15/12/2019", "Uñas", "UG", 450),
  createData("15/01/1973", "Pestañas", "Thea", 300),
  createData("29/11/2000", "Pedicure", "J&M", 200),
  createData("30/04/2008", "Venta", "UG", 100),
  createData("31/01/2008", "Pestañas", "Thea", 500),
  createData("31/01/2008", "Pestañas", "Thea", 500),
  createData("31/01/2008", "Pestañas", "Thea", 500),
];

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  contenedor: {
    background: "rgb(225,226,230)",
    width: "80%",
    height: "50vh",
    margin: "auto",
    marginTop: "5em",
    borderRadius: "20px",
    fontFamily: "Cabin",
    color: "",
  },
  head: {
    background: "red",
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  return (
    <TableContainer className={classes.contenedor}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.head}>
          <TableRow>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Servicio</StyledTableCell>
            <StyledTableCell align="center">Sucursal</StyledTableCell>
            <StyledTableCell align="center">monto</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.fecha}>
              <StyledTableCell align="center">{row.fecha}</StyledTableCell>
              <StyledTableCell align="center">{row.servicio}</StyledTableCell>
              <StyledTableCell align="center">{row.sucursal}</StyledTableCell>
              <StyledTableCell align="center">{row.monto}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
