import { Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";

const useStyles = makeStyles({
  ownedPatternTable:{
    width: '100%',
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

const OwnedPatterns = ({patternList, isFetching, setPatternList}) => {
  const classes = useStyles();
  const {token} = useSelector((state) => state.dashboard);
  const MINIO_HOST = process.env.REACT_APP_MINIO_HOST;
  const BUCKET_AVATAR = process.env.REACT_APP_MINIO_BUCKET_AVATAR

  useEffect(() => {
    const url = `https://masc-api.musicascode.com/mc/pattern/search/owned?page=1`
    getFetchData({url, token})
      .then((res) => (
        res.json()))
      .then((res) => {
        setPatternList(res);
      })
  },[])

  //mock data
  // const pattern_test = [
  //   {
  //     pattern: {
  //       o_username: "test01",
  //       posStart: "0:0:0",
  //       posEnd: "4:0:0",
  //       name: "FreakFrog-99OK65",
  //       tempo: "126.25",
  //       guid: "18CB1D02CA624BC38A342BFB0AA5AE8D",
  //       o_guid: "4BCD85CFE07C45599DB2CEFAE0BC12F0",
  //       stars: 0,
  //       o_avatar: "/3c/6c/3c6ccb83716d1e4fb91d3082f6b21d77",
  //       key: null,
  //       tracks: [
  //         {
  //           a_guid: "109314A2A019464895FDAA8EA8SF4243",
  //           created_utc: "2021-11-22T14:12:20+00:00",
  //           mute: false,
  //           order: 1,
  //           s_category: "BASS",
  //           updated_utc: null,
  //           url: "https://f.4bars.media/E5/D4/E5D41DCEC28A4624B6BD8D80496CFF44.ogg",
  //           volume: -45
  //         },
  //         {
  //           a_guid: "109314A2A019464895FDAA8EA8SF4243",
  //           created_utc: "2021-11-22T14:12:20+00:00",
  //           mute: false,
  //           order: "01",
  //           s_category: "BASS",
  //           updated_utc: null,
  //           url: "https://f.4bars.media/FB/14/FB144EFD4F804030A8B8C89988510AB5.ogg",
  //           volume: -45
  //         },
  //         {
  //           a_guid: "109314A2A019464895FDAA8EA8SF4243",
  //           created_utc: "2021-11-22T14:12:20+00:00",
  //           mute: false,
  //           order: "01",
  //           s_category: "BASS",
  //           updated_utc: null,
  //           url: "https://f.4bars.media/0F/FA/0FFA49CD297C40CB881EE69B79C29E44.ogg",
  //           volume: -45
  //         }
  //       ]
  //     }
  //   },
  //   {
  //     pattern: {
  //       o_username: "test01",
  //       posStart: "0:0:0",
  //       posEnd: "4:0:0",
  //       name: "FreakFrog-99OK65",
  //       tempo: 126.25,
  //       guid: "D3932058CF5444B69F1EBC4ADF6FA892",
  //       o_guid: "4BCD85CFE07C45599DB2CEFAE0BC12F0",
  //       o_avatar: "/3c/6c/3c6ccb83716d1e4fb91d3082f6b21d77",
  //       key: null,
  //       stars: 2,
  //       tracks: [
  //         {
  //           a_guid: "109314A2A019464895FDAA8EA8SF4243",
  //           created_utc: "2021-11-22T14:12:31+00:00",
  //           mute: false,
  //           order: "01",
  //           s_category: "BASS",
  //           updated_utc: null,
  //           url: "https://f.4bars.media/E5/D4/E5D41DCEC28A4624B6BD8D80496CFF44.ogg",
  //           volume: -45
  //         },
  //         {
  //           a_guid: "109314A2A019464895FDAA8EA8SF4243",
  //           created_utc: "2021-11-22T14:12:31+00:00",
  //           mute: false,
  //           order: "01",
  //           s_category: "BASS",
  //           updated_utc: null,
  //           url: "https://f.4bars.media/FB/14/FB144EFD4F804030A8B8C89988510AB5.ogg",
  //           volume: -45
  //         },
  //         {
  //           a_guid: "109314A2A019464895FDAA8EA8SF4243",
  //           created_utc: "2021-11-22T14:12:31+00:00",
  //           mute: false,
  //           order: "01",
  //           s_category: "BASS",
  //           updated_utc: null,
  //           url: "https://f.4bars.media/0F/FA/0FFA49CD297C40CB881EE69B79C29E44.ogg",
  //           volume: -45
  //         }
  //       ]
  //     }
  //   },
  // ]

  
  if(isFetching || !patternList.pattern_search) {
    return(
      <Typography variant="h5">Loading...</Typography>
    )
  }



  return (
    <Grid item xs={12} className={{width: '100%'}}>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
                  <TableCell colSpan={5} className={classes.titleRow} align="left">Owned Patterns</TableCell>
                </TableRow>
            <TableRow>
            <TableCell>GUID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Tempo</TableCell>
            <TableCell>Number of Assets</TableCell>
            <TableCell>Stars</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            patternList.pattern_search.map(({pattern},index) => (
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
                    <TableCell>{pattern.tracks.length}</TableCell>
                    <TableCell>{pattern.stars}</TableCell>
                </TableRow>
              </>
            ))
          }
        </TableBody>
      </TableContainer>
    </Grid>
  )
}

export default OwnedPatterns