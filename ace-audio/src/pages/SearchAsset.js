import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NewHeader from "../modules/NewHeader";

const useStyles = makeStyles({
  marginTop: { marginTop: "1rem" }
});

const SearchAsset = () => {
  const classes = useStyles();

  return (
    <>
      <NewHeader/>
      <Container maxWidth="lg">
        <Grid Container className={classes.marginTop}>
          <Grid item xs={12}>
            <Typography variant="h4">Search Asset</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SearchAsset
