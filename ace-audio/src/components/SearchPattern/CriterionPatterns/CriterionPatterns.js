import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";

const useStyles = makeStyles({
  criterionPatternTable:{
    maxWidth: '59.3rem',
    borderRadius: '0'
  },
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
  searchInput:{
    maxWidth: '24rem',
  },
  criterionDropdown:{
    maxWidth: '14rem',
  },
  alignCenter:{
    display: 'flex',
    alignItems: 'center',
  },
  titleRow: {
    fontSize: '1.5rem',
    backgroundColor:'#f5f5f5',
    width: '100rem'
  },
  tableRowGray: {
    backgroundColor: '#f5f5f5',
    // '&:hover':{
    //   backgroundColor: '#FFFFFF',
    // }
  },
  tableRowWhite: {
    backgroundColor: '#FFFFFF',
    '&:hover':{
      backgroundColor: '#f5f5f5',
    }
  },
});

const CriterionPatterns = ({patternList, isFetching}) => {
  const classes = useStyles();
  const handleCriterionChange = (event) => {
    setCriterion(event.target.value)
  }

  const [resultList, setResultList] = useState([])

  const {token} = useSelector((state) => state.dashboard);
  const criterionList = [
    {
      display: 'Name',
      value: 'Name',
    },
    {
      display: 'Pos Start',
      value: 'PosStart',
    },
    {
      display: 'Pos End',
      value: 'PosEnd',
    },
    {
      display: 'Tempo',
      value: 'Tempo',
    },
  ]
  
  const [criterion, setCriterion] = useState('Tempo')
  const [search, setSearch] = useState('126.25')
  const MINIO_HOST = process.env.REACT_APP_MINIO_HOST;
  const BUCKET_AVATAR = process.env.REACT_APP_MINIO_BUCKET_AVATAR

  useEffect(() => {
      const url = `https://masc-api.musicascode.com/mc/pattern/search/${criterion.toLowerCase()}/${search}?page=1`
      getFetchData({url, token})
        .then((res) => (
          res.json()))
        .then((res) => {
          setResultList(res);
        })


  },[search, criterion])

  const handleCriterionSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <Grid item xs={12} sm={6} className={[classes.justifyCenter, classes.alignCenter, classes.marginBottom]}>
        <TextField size="small" className={classes.searchInput} onChange={handleCriterionSearch} fullWidth id="criterion-search" label="Search" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6} className={[classes.justifyCenter, classes.alignCenter, classes.marginBottom]}>
        <FormControl fullWidth className={classes.criterionDropdown}>
          <InputLabel id="demo-simple-select-label">Search by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={criterion}
            label="Criterion"
            onChange={handleCriterionChange}
          >
            {
              criterionList.map((criterion) => (
                <MenuItem value={criterion.value}>{criterion.display}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={{width: '100%'}}>
      {
        isFetching || !patternList.pattern_search
        ? null
        : resultList.pattern_search === undefined || resultList.pattern_search.length < 1 || search.length < 0 ? null :
          <TableContainer component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={6} className={classes.titleRow} align="left">Searched by {criterion}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>GUID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Tempo</TableCell>
                <TableCell>Stars</TableCell>
                <TableCell>Number of Assets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                resultList.pattern_search.map(({pattern}, index) => (
                  <>
                    <TableRow className={index % 2 === 0 ? classes.tableRowGray : ""}>
                      <TableCell>
                        <Link to={`/pattern/${pattern.guid}`}>
                          {pattern.guid}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <img 
                          src={MINIO_HOST + BUCKET_AVATAR + pattern.o_avatar + ".jpg"} 
                          alt="user_avatar"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell>{pattern.tempo}</TableCell>
                      <TableCell>{pattern.stars}</TableCell>
                      <TableCell>{pattern.tracks.length}</TableCell>
                    </TableRow>
                  </>
                ))
              }
            </TableBody>
          </TableContainer>
      }
      </Grid>
    </>
  )
}

export default CriterionPatterns