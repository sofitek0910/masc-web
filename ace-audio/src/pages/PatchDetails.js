import { CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";
import NewHeader from "../modules/NewHeader";



  const useStyles = makeStyles({
  marginTop: {
    marginTop: "1.5rem"
  },
  editBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  downloadBtn: {
    marginTop: "1.5rem",
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const PatchDetails = () => {

  const classes = useStyles()

  const { guid } = useParams();


  const { token } = useSelector((state) => state.dashboard);


  // Fetch patch details waitign for endpoint to be created
  //const [patch, setPatch] = useState("")
  // const getPatch = async (guid) => {
  //   const urlPatch =
  //     `https://masc-api.musicascode.com/mc/patch/${guid}`;
  //   return await fetch(urlPatch, {
  //     method: "get",
  //     headers: new Headers({
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     }),
  //   })
  //     .then((res) => (
  //       res.json()))
  //     .then((res) => setPatch(res));
  // }

  // useEffect(() => {
  //   getPatch(guid);
  // }, []);

    const [patch, setPatch] = useState({})
    const [isFetching, setIsFetching] = useState(true)
    const MINIO_HOST = process.env.REACT_APP_MINIO_HOST;
    const BUCKET_AVATAR = process.env.REACT_APP_MINIO_BUCKET_AVATAR

    useEffect(() => {
      setIsFetching(true)
      const url = `https://masc-api.musicascode.com/mc/patch/${guid}/details`;
      getFetchData({url, token})
        .then((res) => (
          res.json()))
        .then((res) => {
          setPatch(res);
        });;
      setIsFetching(false);
    }, []);

  return (
    
      isFetching 
        ? <CircularProgress />
        :
        <>
          <NewHeader/>
          <Container maxWidth="lg" className={classes.marginTop}>
            <Grid container mt={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">
                  Patch: {guid}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.editBtn}>
                <Link to={`/patchv2/${guid}/editor`}>
                  <Button variant="primary">Edit Patch</Button>
                </Link> 
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper} className={classes.marginTop}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Created</TableCell>
                        <TableCell align="center">Updated</TableCell>
                        <TableCell align="center">User</TableCell>
                        <TableCell align="center">Plugin Guid</TableCell>
                        <TableCell align="center">Stars</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableCell>{patch.created_utc}</TableCell>
                      <TableCell align="center">{patch.updated_utc}</TableCell>
                      <TableCell align="center">
                        <img 
                          src={MINIO_HOST + BUCKET_AVATAR + patch.o_avatar + ".jpg"} 
                          alt="user_avatar"
                          style={{
                            width: "1.875rem",
                            height: "1.875rem",
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{patch.plugin_guid}</TableCell>
                      <TableCell align="center">{patch.stars}</TableCell>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} className={classes.downloadBtn}>
                <Button variant="primary">Download</Button>
              </Grid>
            </Grid>
          </Container>
        </>
  )
}

export default PatchDetails
