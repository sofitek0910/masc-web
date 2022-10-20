// https://masc-api.musicascode.com/mc/sequence/list/188549B371E648EE8B3E77F0C6B681B5?page=1

import { Container, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";
import NewHeader from "../modules/NewHeader";

const useStyles = makeStyles({
  table: {
    borderRadius: "0"
  },
  dropdown: {
    minWidth: '14rem'
  },
  patchBtn: {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  marginTop: {
    marginTop: '2rem'
  },
  marginBottom: {
    marginBottom: '2rem'
  },
  tableRowGray: {
    backgroundColor: '#f5f5f5'
  },
  titleRow: {
      fontSize: "1.5rem",
      backgroundColor:'#f5f5f5',
  }
});

const Index = () => {
  const classes = useStyles();
  const { token } = useSelector((state) => state.dashboard);

  // Plugins for dropdown
  // const plugins = [
  //   {
  //     display: 'Surge',
  //     value: 'Surge.vst3'
  //   },
  //   {
  //     display: 'Surge Effects Bank',
  //     value: 'SurgeEffectsBank.vst3'
  //   }
  // ]
  

  const [plugin, setPlugin] = useState('Surge.vst3');
  const [patch, setPatch] = useState({});
  const [isFetching, setIsFetching] = useState(true)
  const MINIO_HOST = process.env.REACT_APP_MINIO_HOST;
  const BUCKET_AVATAR = process.env.REACT_APP_MINIO_BUCKET_AVATAR

  useEffect(() => {
    setIsFetching(true)
    const url = `https://masc-api.musicascode.com/mc/patch/search?page=1`;
    getFetchData({url, token})
      .then((res) => (
        res.json()))
      .then((res) => setPatch(res));;
    setIsFetching(false);
  }, [plugin]);

  const emptyPatch = patch?.patches?.length === 0 || patch?.patches === null || patch?.patches === undefined;
  
  	// 	{
		// 	"stars": 1,
		// 	"guid": "28652E6971B24B038FA0926049F3C2C10",
		// 	"location_host": "test host",
		// 	"plugin_guid": "28652E6971B24B038FA0926049F3C2C5",
		// 	"star": false,
		// 	"o_avatar": "/3c/6c/3c6ccb83716d1e4fb91d3082f6b21d77",
		// 	"updated_utc": "2021-12-30T08:50:14+00:00",
		// 	"location_path": "test path",
		// 	"location_bucket": "test bucket",
		// 	"o_sub": "4bcd85cf-e07c-4559-9db2-cefae0bc12f0",
		// 	"created_utc": "2021-12-30T08:50:14+00:00",
		// 	"o_name": "test01"
		// }

  return (
    <div>
      <NewHeader />
      <Container maxWidth="lg">
        <Grid container className={classes.marginTop}>
          <Grid
            item
            xs={12}
            className={[classes.patchBtn, classes.marginBottom]}
          >
            <Link to="/patch/new/editor">
              <Button variant="primary">New Patch</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.marginBottom}>
            <Typography variant="h4">Search PATCH</Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6} className={[classes.flexEnd,classes.marginBottom]}>
            <FormControl className={classes.dropdown}  >
                <InputLabel id="patch-search">Plugins</InputLabel>
                <Select
                  labelId="patch-search"
                  id="patch-search"
                  value={plugin}
                  label="Plugins"
                  onChange={handlePluginChange}
                >
                  {plugins.map((plugin) => (
                    <MenuItem value={plugin.value}>{plugin.display}</MenuItem>
                    ))
                  }
                </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <TableContainer component={Paper} className={classes.table}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      className={classes.titleRow}
                      colSpan={5}
                    >
                      Patches
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>GUID</TableCell>
                    <TableCell align="center">User</TableCell>
                    <TableCell align="center">Created UTC</TableCell>
                    <TableCell align="center">Update UTC</TableCell>
                    <TableCell align="center">Stars</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isFetching ? null : emptyPatch ? (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        No Patch Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    patch?.patches?.map((patch, index) => (
                      <TableRow
                        className={index % 2 === 0 ? classes.tableRowGray : ""}
                      >
                        <TableCell>
                          <Link to={`/patch/${patch.guid}`}>{patch.guid}</Link>
                        </TableCell>
                        <TableCell>
                          <img
                            src={
                              MINIO_HOST +
                              BUCKET_AVATAR +
                              patch.o_avatar +
                              ".jpg"
                            }
                            alt="user_avatar"
                            style={{
                              width: "1.875rem",
                              height: "1.875rem",
                              borderRadius: "50%",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {patch.created_utc}
                        </TableCell>
                        <TableCell align="center">
                          {patch.updated_utc}
                        </TableCell>
                        <TableCell align="center">{patch.stars}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
