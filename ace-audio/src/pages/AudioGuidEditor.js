// https://masc-api.musicascode.com/mc/sequence/list/188549B371E648EE8B3E77F0C6B681B5?page=1

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Index = () => {
  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  const { token } = useSelector((state) => state.dashboard);

  const getTodos = () => {
    const urlTodos =
      "https://masc-api.musicascode.com/mc/sequence/list/188549B371E648EE8B3E77F0C6B681B5?page=1";
    return fetch(urlTodos, {
      method: "get",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/yaml",
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => setTodos(res));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Container>
      <h3>AUDIO GUID EDITOR</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>GUID</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">GAME COUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Index;
