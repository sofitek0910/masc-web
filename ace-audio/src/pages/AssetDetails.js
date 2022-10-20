import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useKeycloak } from "@react-keycloak/web";
import WaveComponent from "modules/WaveComponent";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useTracking } from "react-tracking";
import { getFetchData, useAxios } from "utilities/helper/helper";
import { TRACKING_EVENT } from "../constants/common";
import NewHeader from "../modules/NewHeader";
import settings from "../settings";
import useCheckObjectPermission from "../utilities/hooks/auth/checkObjectPermissions";
import axios from "axios";
import fileDownload from "js-file-download";

const useStyles = makeStyles({
  marginTop: { marginTop: "1rem" },
  table: {
    maxWidth: "27.5rem",
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "44rem",
    marginTop: "1rem",
  },
  wavePlayer: {
    maxWidth: "50rem",
  },
});

const AssetDetails = () => {
  const classes = useStyles();

  const { guid } = useParams();
  const [audio, setAudio] = useState();
  const { token, user } = useSelector((state) => state.dashboard);

  const [asset, setAsset] = useState([]);
  const [isFetching, setisFetching] = useState(true);
  const [playingGuid, setPlayingGuid] = useState(null);
  const [permissions, setPermissions] = useState("anonymous");
  const [posValue, setPos] = useState(0);
  const [waveWidth, setWaveWidth] = useState(100);
  const [keycloak, initialized] = useKeycloak();
  const [isOpen, setIsOpen] = useState(false);
  const [listAssets, setListAssets] = useState([]);
  const axiosInstance = useAxios(settings.apiUrl);
  const { trackEvent } = useTracking();
  const [waveSufferValue, setWaveSuffer] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const history = useHistory();
  let authGroup = useCheckObjectPermission("AssetStar");
  let loopTimeOut = null;

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    try {
      const headerObj = { Authorization: `Bearer ${accessToken}` };
      const url = `${process.env.REACT_APP_URL}/audio/${guid}`;
      axios.get(url, { headers: headerObj }).then((res) => {
        setAudio(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [guid, accessToken]);

  console.log(audio);
  useEffect(() => {
    setisFetching(true);
    const url = `https://masc-api.musicascode.com/mc/asset/${guid}/items`;
    getFetchData({ url, token })
      .then((res) => res.json())
      .then((res) => {
        const { assets } = res;
        setAsset({
          "ai.guid": assets[0].ai_guid,
          "a.key": assets[0].a_key,
          "ai.bit_rate": assets[0].ai_bit_rate,
          "ai.bpm": assets[0].ai_bpm,
          "ai.category": assets[0].ai_category,
          "a.guid": assets[0].a_guid,
          "ai.duration": assets[0].ai_duration,
          url: assets[0].url,
        });
      });
    setisFetching(false);
  }, [guid]);

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const onLikeAsset = async (asset) => {
    // debugger
    try {
      if (!asset.like) {
        // like immediately
        setListAssets((value) =>
          value.map((element) => {
            if (element["a.guid"] === asset["a.guid"]) {
              return {
                ...asset,
                like: true,
                count: (asset.count || 0) + 1,
              };
            }
            return element;
          })
        );
        const url = `/like/asset/${asset["a.guid"]}`;
        const resp = await axiosInstance.put(url);
        if (!resp?.data?.guid) {
          setListAssets((value) =>
            value.map((element) => {
              if (element["a.guid"] === asset["a.guid"]) {
                return {
                  ...asset,
                  like: false,
                  count: (asset.count || 1) - 1,
                };
              }
              return element;
            })
          );
        }
      } else {
        setListAssets((value) =>
          value.map((element) => {
            if (element["a.guid"] === asset["a.guid"]) {
              return {
                ...asset,
                like: false,
                count: (asset.count || 1) - 1,
              };
            }
            return element;
          })
        );
        const url = `/like/asset/${asset["a.guid"]}`;
        const resp = await axiosInstance.delete(url);
        if (resp?.data?.message !== "unliked") {
          setListAssets((value) =>
            value.map((element) => {
              if (element["a.guid"] === asset["a.guid"]) {
                return {
                  ...asset,
                  like: true,
                  count: (asset.count || 0) + 1,
                };
              }
              return element;
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = (action) => {
    if (authGroup["objectState"] === "authorized") {
      setIsOpen(false);
    } else if (authGroup["objectState"] === "anonymous" && !keycloak.token) {
      setIsOpen(true);
    } else {
      setIsOpen(true);
    }

    if (initialized && keycloak.token) {
      if (action.type === "like") {
        onLikeAsset(action.target);
      }
      // else if (action.type === 'copy') {
      //     onCopy(action.target)
      // }
    } else {
      setIsOpen(true);
    }
  };

  const onPlayingGuid = (guid) => {
    if (playingGuid === guid) {
      trackEvent({
        event: TRACKING_EVENT.ASSET_PLAYER_STOP,
        data: {
          duration: Math.floor(posValue * 1000),
          completed: false,
          guid,
        },
      });
      setPlayingGuid(null);
    } else {
      setPlayingGuid((value) => {
        if (value) {
          trackEvent({
            event: TRACKING_EVENT.ASSET_PLAYER_STOP,
            duration: Math.floor(posValue * 1000),
            completed: false,
            guid: value,
          });
        }
        return guid;
      });
    }
    setPos(0);
    setWaveSuffer((value) => {
      if (value && value.seekTo) {
        value.seekTo(0);
      }
      return null;
    });
  };

  const onPosChange = (pos, waveSuffer) => {
    if (pos !== posValue) {
      setPos(pos);
      setWaveSuffer(waveSuffer);

      if (Math.ceil(pos) === Math.ceil(waveSuffer.getDuration())) {
        loopTimeOut = setTimeout(() => {
          waveSuffer.seekTo(0);
          trackEvent({
            event: TRACKING_EVENT.ASSET_PLAYER_STOP,
            data: {
              completed: true,
              guid: playingGuid,
            },
          });
        }, 700);
      }
    }
  };

  const modalStyle = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpenModal = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      handleDownload(asset.url, `${asset["a.guid"]}.ogg`);
    }
  };
  const handleCloseModal = () => setShowLoginModal(false);
  const login = () => {
    setShowLoginModal(false);
    history.push("/login");
  };

  return (
    <>
      <NewHeader />
      {isFetching || asset.length === 0 ? (
        <Box className={classes.justifyCenter}>
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Grid container className={classes.justifyCenter}>
            <Grid item xs={12} className={classes.wavePlayer}>
              <WaveComponent
                key={asset["a_guid"]}
                asset={asset}
                handleAction={handleAction}
                playing={playingGuid === asset["a_guid"]}
                onPlaying={() => onPlayingGuid(asset["a_guid"])}
                posValue={posValue}
                onPosChange={onPosChange}
                waveWidth={waveWidth}
              />
            </Grid>
            <Grid item xs={12} className={classes.justifyCenter}>
              <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>Asset Guid</TableCell>
                      <TableCell>{asset["a.guid"]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Asset Key</TableCell>
                      <TableCell>
                        {asset["a.key"] == null ? "No Key" : asset.a_key}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Asset Bit Rate</TableCell>
                      <TableCell>{asset["ai.bit_rate"]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Asset BPM</TableCell>
                      <TableCell>{asset["ai.bpm"]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Asset Category</TableCell>
                      <TableCell>
                        {asset["ai.category"] == null
                          ? "No Category"
                          : asset.ai_category}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} className={classes.spaceBetween}>
              <Button
                onClick={() =>
                  handleDownload(asset.url, `${asset["a.guid"]}.ogg`)
                }
              >
                Download OGG 96kbps
              </Button>
              <Button
                variant={user ? "primary" : "secondary"}
                onClick={handleOpenModal}
              >
                Download OGG 320kbps
              </Button>
              <Button
                variant={user ? "primary" : "secondary"}
                onClick={handleOpenModal}
              >
                Download High Quality 44 khz WAV
              </Button>
            </Grid>
          </Grid>
          <Modal
            open={showLoginModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography
                id="modal-modal-title"
                align="center"
                variant="h6"
                component="h2"
              >
                You need to login first
              </Typography>
              <Button onClick={() => login()}>Login</Button>
            </Box>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default AssetDetails;
