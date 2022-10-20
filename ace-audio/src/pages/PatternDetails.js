import { Container, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";
import NewHeader from "../modules/NewHeader";

const useStyles = makeStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  marginTop: {
    marginTop: '2rem',
  },
  titleRow: {
    fontSize: '1.5rem',
    backgroundColor:'#f5f5f5',
    width: '100rem'
  },
  marginBottom: {
    marginBottom: '2rem',
  },
});

const PatternDetails = () => {

  const classes = useStyles();

  const { guid } = useParams();

  const [pattern, setPattern] = useState([])
  const [isFetchig, setIsFetchig] = useState(true)

  const { token } = useSelector((state) => state.dashboard);

  useEffect(() => {
    setIsFetchig(true)
    const url = `https://masc-api.musicascode.com/mc/pattern/${guid}/assets`;
    getFetchData({url, token})
      .then((res) => (
        res.json()))
      .then((res) => {
        const { pattern } = res;
        setPattern(pattern);
      })
    setIsFetchig(false)
  } , [guid])

  return (
    <>
      <NewHeader/>
      <Container maxWidth="lg">
        <Grid container className={classes.marginTop}>
          <Grid item xs={12} className={[classes.justifyCenter, classes.marginBottom]}>
            <Typography variant="h5">Pattern {pattern?.name}</Typography>
          </Grid>
          <Grid item xs={12} className={{ width: '100%' }}>
            {
              isFetchig || pattern?.length === 0 
              ?  <Typography align="center">Loading...</Typography>
              :
                <TableContainer component={Paper} className={{ width: '100rem' }} >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={5} className={classes.titleRow} align="left">Assets</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>GUID</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Order</TableCell>
                      <TableCell>Volume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      pattern?.tracks.length ? pattern?.tracks.map((track) => ( 
                        <TableRow>
                            <TableCell>
                              <Link to={`/audio/${track.a_guid}`}>
                                {track.a_guid}
                              </Link>
                            </TableCell>
                          <TableCell>{track.s_category}</TableCell>
                          <TableCell>{track.order}</TableCell>
                          <TableCell>{track.volume}</TableCell>
                        </TableRow>
                      )):""
                    }
                  </TableBody>
                </TableContainer>
            }
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default PatternDetails
