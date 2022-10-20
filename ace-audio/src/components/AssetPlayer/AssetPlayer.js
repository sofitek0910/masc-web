import {
  CircularProgress, Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";
//import { BaseLayout } from "layouts/Base";
import "intersection-observer";
import React, { useEffect } from "react";
import { useTracking } from "react-tracking";
import { TRACKING_EVENT } from "../../constants/common";
import WaveComponent from "../../modules/WaveComponent";
import settings from "../../settings";
import { getQueryString, useAxios } from "../../utilities/helper/helper";
import useCheckObjectPermission from "../../utilities/hooks/auth/checkObjectPermissions";
import FilterAsset from "./FilterAsset";



const options = {
  root: document,
  rootMargin: "0px",
  threshold: 0.1,
};

let loopTimeOut = null;

const AssetPlayer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [listAssets, setListAssets] = React.useState([]);
  const [listBpm, setListBpm] = React.useState([]);
  const axiosInstance = useAxios(settings.apiUrl);
  const [keycloak, initialized] = useKeycloak();
  const paramsRef = React.useRef(1);
  const pageRef = React.useRef(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEnd, setIsEnd] = React.useState(false);

  const [playingGuid, setPlayingGuid] = React.useState(null);
  const [posValue, setPos] = React.useState(0);
  const [waveSufferValue, setWaveSuffer] = React.useState(null);
  const [waveWidth, setWaveWidth] = React.useState(100);
  const { trackEvent } = useTracking();


  let authGroup = useCheckObjectPermission('AssetStar')

//log

  const LoginModal = () => {
    return (
        <Dialog open={isOpen } onClose={() => setIsOpen(false)}>
          <DialogTitle>To use this functionality you should login</DialogTitle>
          <DialogActions className='container d-flex justify-content-around'>
            <button onClick={() => setIsOpen(false)} type="button" className="btn btn-secondary">
              Close
            </button>
            <button onClick={onLogin} type="button" className="btn btn-primary">
              Login with Discord
            </button>
          </DialogActions>
        </Dialog>
    )
  }

  const onPosChange = (pos, waveSuffer) => {


    if (pos !== posValue) {
      setPos(pos);
      setWaveSuffer(waveSuffer);
      if (Math.ceil(pos) === Math.ceil(waveSuffer.getDuration())  ) {
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

  // const onCopy = (asset) =>{
  //   setListAssets((value) =>
  //       value.map((element) => {
  //         if (element["a.guid"] === asset["a.guid"]) {
  //           return {
  //             ...asset,
  //             copy:true,
  //           };
  //         } else {
  //           console.log('On copy issue')
  //         }
  //         return element;
  //       })
  //   );
  //
  // }  

  const onLogin = () => {
    keycloak.login(
      {idpHint: 'discord'}
    );
  };

  const onLikeAsset = async (asset) => {

    try {
      if (!asset.like) {
        // like immediately
        setListAssets((value) =>
          value.map((element) => {
            if (element["a.guid"] === asset["a.guid"]) {
              return {
                ...asset,
                like: true,
                stars: (asset.stars || 0) + 1,
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
                  stars: (asset.stars || 1) - 1,
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
                stars: (asset.stars || 1) - 1,
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
                  stars: (asset.stars || 0) + 1,
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
    if (authGroup['objectState'] === "authorized") {
      setIsOpen(false)
    } else if(authGroup['objectState'] === "anonymous" &&
        !keycloak.token) {
      setIsOpen(true)
    }else {
      setIsOpen(true)
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
  const handleFilterAsset = async (
    bpmValue,
    categoryValue,
    signatureValue,
    searchValue
  ) => {
    const params = {
      q: searchValue,
      t: signatureValue,
      page: pageRef.current,
    };
    setIsEnd(false);
    const url = `/asset/search?${getQueryString(params)}`;
    try {
      setIsLoading(true);
      const resp = await axiosInstance.get(url);

      if (resp?.data?.assets && resp?.data?.assets?.length > 0) {
        pageRef.current = pageRef.current + 1;
        setListAssets((value) => [...value, ...resp?.data?.assets]);
      } else {
        setIsEnd(true);
        pageRef.current = 0;
      }
      setIsLoading(false);
    } catch (error) {
      pageRef.current = 0;
      setIsEnd(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleFilterAssetBySearch = async (
    bpmValue,
    categoryValue,
    signatureValue,
    searchValue
  ) => {
    if (pageRef.current === 0) {
      await handleFilterAsset(
        bpmValue,
        categoryValue,
        signatureValue,
        searchValue
      );
    }
    pageRef.current = 1;
    await setListAssets([]);
    paramsRef.current = {
      bpmValue,
      categoryValue,
      signatureValue,
      searchValue,
    };
  };

  const handleFetchBpm = async () => {
    const url = "/bpm";
    try {
      setIsLoading(true);
      const resp = await axiosInstance.get(url);
      if (resp?.data?.bpm) {
        setListBpm(resp?.data?.bpm);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // const handleResizeWaveList = () => {
  //   // force rerender
  //   setListAssets(value => value.map(element => ({...element})));
  // }

  let loader = document.getElementById("loader");
  let observer;

  const handleInit = async () => {
    await handleFetchBpm();
    await handleFilterAssetBySearch("126.25", "bass");
    if (loader && observer == null) {
      observer = new IntersectionObserver(
        (evt) => handleObserver(evt),
        options
      );
      observer.observe(loader);
    }
  };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResizeWaveList);
  //   return () => {
  //     window.removeEventListener('resize', handleResizeWaveList);
  //   }
  // }, []);

  useEffect(() => {
    if (axiosInstance) {
      handleInit();
    }
  }, [axiosInstance]);

  const handleObserver = async (evt) => {
    if (evt && evt[0] && evt[0].isIntersecting && Boolean(paramsRef?.current)) {
      await handleFilterAsset(
        paramsRef?.current?.bpmValue,
        paramsRef?.current?.categoryValue,
        paramsRef?.current?.signatureValue,
        paramsRef?.current?.searchValue
      );
      observer.unobserve(loader);
      observer.observe(loader);
    }
  };


  return (
    <>
      {/* <BaseLayout customStyle={{ background: "white" }}> */}
      <div className="asset-layer row">
        <div className="col-lg-3 col-md-5">
          <FilterAsset
            handleFilterAsset={handleFilterAssetBySearch}
            listBpm={listBpm}
          />
        </div>
        <div className="col-lg-9 col-md-7 wave-list-container">
            {
            listAssets.map((asset) => (
            
            <WaveComponent
              key={asset?.["a.guid"]}
              asset={asset}
              handleAction={handleAction}
              playing={playingGuid === asset?.["a.guid"]}
              onPlaying={() => onPlayingGuid(asset?.["a.guid"])}
              posValue={posValue}
              onPosChange={onPosChange}
              waveWidth={waveWidth}
            />
          ))}
          {!isEnd && (
            <div className="loader-container" id="loader">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      <LoginModal />
      {/* </BaseLayout> */}
    </>
  );
};

export default AssetPlayer;
