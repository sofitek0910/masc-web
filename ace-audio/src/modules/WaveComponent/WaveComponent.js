import ReactWaves from "@dschoon/react-waves";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toastr from 'toastr';
import bubble from "../../assets/img/bubble.svg";
import copy from "../../assets/img/copy.svg";
import editIcon from "../../assets/img/edit.svg";
import starFillIcon from "../../assets/img/star-fill.svg";
import starIcon from "../../assets/img/star.svg";
import { copyToClipBoard } from "../../utilities/helper/helper";

const WaveComponent = ({
  asset,
  handleAction,
  playing,
  onPlaying,
  posValue,
  onPosChange,
  waveWidth,
}) => {


  const newDomain = 'https://io.musicascode.com/audio';
  const assetFirstPair = `/${asset["ai.guid"].slice(0,2)}`;
  const assetSecondPair = `/${asset["ai.guid"].slice(2,4)}`;
  const assetGuid = `/${asset["ai.guid"]}`;
  const assetFileExtension = ".ogg";
  asset.url = newDomain + assetFirstPair + assetSecondPair + assetGuid + assetFileExtension;
  const MINIO_HOST = process.env.REACT_APP_MINIO_HOST;
  const BUCKET_AVATAR = process.env.REACT_APP_MINIO_BUCKET_AVATAR
  const avatarImage =  MINIO_HOST+ BUCKET_AVATAR + asset.o_avatar + ".jpg";
  const { user } = useSelector((state) => state.dashboard);
  const copyAssetGuid = () => {
      toastr.success("Copied to clipboard")
      copyToClipBoard(asset["ai.guid"]);
  }

  //   const authGroup = useCheckObjectPermission('AssetStar')
  // function checkPermission(authGroup) {
  //
  //     if (authGroup["objectState"] === 'authorized') {
  //
  //     }else {
  //
  //     }
  // }

  return (
    <div className="wave-container">
      <div
        className={classNames("wave-play-button", { active: playing })}
        onClick={onPlaying}
      />
      <div className="wave-information">
          <div className="wave-bpm">
              <span className="badge rounded-pill bg-dark">{asset["ai.bpm"]}</span>
          </div>
        <div className="wave-duration">
          {asset ? `${asset["ai.duration"]}s` : ""}
        </div>
        <ReactWaves
          audioFile={asset ? asset.url : ""}
          className="react-waves"
          options={{
            barHeight: 2,
            cursorWidth: 2,
            cursorColor: "#e67717",
            height: 100,
            hideScrollbar: true,
            progressColor: "#545454",
            responsive: true,
            waveColor: "#9e9e9e",
            minWidth: "100%",
            barWidth: 2,
          }}
          volume={1}
          zoom={1}
          playing={playing}
          pos={posValue}
          onPosChange={onPosChange}
        />
        <div className="wave-button-container">
          <div className="interactive-button">
            <div
              className="wave-button"
              onClick={() =>
                handleAction({
                  type: "like",
                  target: asset,
                })
              }
            >
              <img src={((asset.like || asset['stars'] > 0) && user) ? starFillIcon : starIcon} alt="like" />
              {`STARS ${asset.stars || 0}`}
            </div>
                  <Link className='wave-button nounderline' onClick={() => {

                  }} to={`/audio/${asset["a.guid"]}/editor`}>
                      <img src={editIcon}  alt="edit" />
                      EDIT
                  </Link>
                  
                  <Link className="wave-button nounderline" to={`/audio/${asset["a.guid"]}`}>
                      <img src={bubble} alt={bubble} />
                      {`VIEW`}
                  </Link>

                      <img src={avatarImage} alt="avatarImg" style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }} />
          </div>
          <div className="guid-button" onClick={copyAssetGuid
            //   () => {
            //   const copyAsset = handleAction({
            //       type: "copy",
            //       target: asset,
            //   })
            //   useEffect(() => {
            //       copyAssetGuid()
            //   }, [])
            //   debugger
            // }
          }>
            <img src={copy} alt="copy" />
              <span>{asset ? asset["a.guid"] : ""}</span>
          </div>
            {/*<ToastContainer hideProgressBar={false} limit={1} />*/}
        </div>
      </div>
    </div>
  );
};

export default WaveComponent;
