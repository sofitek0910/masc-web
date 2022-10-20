import { Box, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CriterionPatterns from "components/SearchPattern/CriterionPatterns/CriterionPatterns";
import OwnedPatterns from "components/SearchPattern/OwnedPatterns/OwnedPatterns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFetchData } from "utilities/helper/helper";
import NewHeader from "../modules/NewHeader";

const useStyles = makeStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  dropdown: {
    minWidth: '14rem'
  },
  marginTop: {
    marginTop: '2rem',
  },
  marginBottom: {
    marginBottom: '2rem',
  },
  alignCenter:{
    display: 'flex',
    alignItems: 'center',
  }
});

const SearchPattern = () => {

  const patternListCategory = [
    {
      display: 'Criterion',
      value: 'criterion'
    },
    {
      display: 'Owned Patterns',
      value: 'ownedPatterns'
    },
  ]
  
  const Criterion_Pattern_URL = 'https://masc-api.musicascode.com/mc/pattern/search/name/FreakFrog-99OK65?page=1'
  const classes = useStyles();
  const [patternList, setPatternList] = useState([])
  const [pattern, setPattern] = useState('criterion')
  const [url, setUrl] = useState(Criterion_Pattern_URL)
  const { token } = useSelector((state) => state.dashboard);
  const [isFetching, setIsFetching] = useState(true);



  useEffect(() => {
    setIsFetching(true)
    getFetchData({url, token})
      .then((res) => (
        res.json()))
      .then((res) => {
        setPatternList(res);
        setIsFetching(false)
      })
  } , [])

  const handlePatternChange = async (event) => {
    setPattern(event.target.value)
  }
  
  return (
      <div>
        <NewHeader />
        {
          patternList.length === 0 
            ? (
              <Box className={[classes.justifyCenter,classes.marginTop]}>
                <CircularProgress  />
              </Box>
            )
            : 
              <Container maxWidth="lg">
                <Grid container className={classes.marginTop}>
                  <Grid item xs={12} sm={6} className={classes.marginBottom}>
                    <Typography variant="h4">Search Pattern</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.flexEnd}>
                      <FormControl className={classes.dropdown}  >
                          <InputLabel id="patch-search">Patterns by</InputLabel>
                          <Select
                            labelId="patch-search"
                            id="patch-search"
                            value={pattern}
                            label="Patterns"
                            onChange={handlePatternChange}
                          >
                            {patternListCategory.map((pattern) => (
                              <MenuItem value={pattern.value}>{pattern.display}</MenuItem>
                              ))
                            }
                          </Select>
                      </FormControl>
                  </Grid>
                    {
                      pattern === 'criterion' 
                        ? <CriterionPatterns patternList={patternList} isFetching={isFetching} />
                        : <OwnedPatterns patternList={patternList} setPatternList={setPatternList} isFetching={isFetching} />
                    }
                </Grid>
              </Container>
        }
      </div>
    );
};

export default SearchPattern;
